import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { FindTasksFiltersDto } from './dto/find-tasks-filters.dto';
import { Filters, cleanFilters } from '../utils/clean-filters';
import { addDateRange } from '../utils/date-range-filter';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.save(createTaskDto);
  }

  async findAll(filters: FindTasksFiltersDto): Promise<Task[]> {
    const cleanedFilters = cleanFilters(filters as unknown as Filters);
    const filterWithDate = addDateRange(cleanedFilters);

    return await this.tasksRepository.find({
      where: filterWithDate,
      relations: ['studentToTask'],
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(id: number, updateRequest: UpdateTaskDto): Promise<Task> {
    try {
      const { studentId, markingId, observation } =
        updateRequest.studentToTask ?? {};
      const task = await this.tasksRepository.findOne({
        where: { id },
        relations: ['studentToTask'],
      });

      if (!task) throw new NotFoundException('Task not found');

      if (studentId) {
        for (const relation of task.studentToTask) {
          if (relation.studentId === updateRequest.studentToTask?.studentId) {
            relation.markingId = markingId ?? relation.markingId;
            relation.observation = observation ?? relation.observation;
            break;
          }
        }
      }

      const updatedTask = {
        ...task,
        ...updateRequest,
        studentToTask: [...task.studentToTask],
      };

      return await this.tasksRepository.save(updatedTask);
    } catch (error) {
      console.error(error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) throw new NotFoundException('Task not found');

    return this.tasksRepository.remove(task);
  }
}
