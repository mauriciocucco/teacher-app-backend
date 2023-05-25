import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.save(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) throw new NotFoundException('Task not found');

    return await this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) throw new NotFoundException('Task not found');

    return this.tasksRepository.remove(task);
  }
}
