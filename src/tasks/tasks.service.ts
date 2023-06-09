import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { FindTasksFiltersDto } from './dto/find-tasks-filters.dto';
import { Filters, cleanFilters } from '../utils/clean-filters';
import { addDateRange } from '../utils/date-range-filter';
import { Course } from '../courses/entities/course.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { CreateStudentToTaskDto } from '../student-to-task/dto/create-student-to-task.dto';
import { StudentToTask } from '../student-to-task/entities/student-to-task.entity';
import { Student } from '../students/entities/student.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(StudentToTask)
    private studentToTaskRepository: Repository<StudentToTask>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const existingCourse = await this.courseRepository.findOneByOrFail({
        id: createTaskDto.course,
      });
      const existingSubject = await this.subjectRepository.findOneByOrFail({
        id: createTaskDto.subject,
      });
      const studentToTask = await Promise.all(
        createTaskDto.studentToTask.map((studentToTask) =>
          this.createStudentToTask(studentToTask),
        ),
      );
      const newTask = await this.tasksRepository.create({
        ...createTaskDto,
        course: existingCourse,
        subject: existingSubject,
        studentToTask,
      });

      return await this.tasksRepository.save(newTask);
    } catch (error) {
      console.error('Hubo un error en create de Task: ', error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async findAll(filters: FindTasksFiltersDto): Promise<Task[]> {
    const cleanedFilters = cleanFilters(filters as unknown as Filters);
    const filterWithDate = addDateRange(cleanedFilters);

    return await this.tasksRepository.find({
      where: filterWithDate,
      relations: {
        studentToTask: {
          student: true,
          marking: true,
        },
        course: true,
        subject: true,
      },
      loadRelationIds: {
        relations: ['course', 'subject'],
      },
      order: {
        date: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: {
        studentToTask: {
          student: true,
          marking: true,
        },
        course: true,
        subject: true,
      },
      loadRelationIds: {
        relations: ['course', 'subject'],
      },
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
        relations: {
          studentToTask: true,
        },
      });

      if (!task) throw new NotFoundException('Task not found');

      const existingCourse = updateRequest.course
        ? await this.courseRepository.findOneByOrFail({
            id: updateRequest.course,
          })
        : null;
      const existingSubject = updateRequest.subject
        ? await this.subjectRepository.findOneByOrFail({
            id: updateRequest.subject,
          })
        : null;

      if (studentId) {
        for (const relation of task.studentToTask) {
          if (relation.studentId === updateRequest.studentToTask?.studentId) {
            relation.markingId = markingId ?? relation.markingId;
            relation.observation = observation ?? relation.observation;
            break;
          }
        }
      }

      const deepUpdateRequestClone = JSON.parse(JSON.stringify(updateRequest));

      if (existingCourse) deepUpdateRequestClone.course = existingCourse;
      if (existingSubject) deepUpdateRequestClone.subject = existingSubject;

      const updatedTask = await this.tasksRepository.preload({
        ...task,
        ...deepUpdateRequestClone,
        studentToTask: [...task.studentToTask],
      });

      if (!updatedTask) throw new NotFoundException('Task not found');

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

  private async createStudentToTask(studentToTask: CreateStudentToTaskDto) {
    try {
      const student = await this.studentRepository.findOneByOrFail({
        id: studentToTask.studentId,
      });

      return this.studentToTaskRepository.create({
        ...studentToTask,
        student,
      });
    } catch (error) {
      throw error;
    }
  }
}
