import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DataSource, Repository } from 'typeorm';
import { Exam } from '../exams/entities/exam.entity';
import { Task } from '../tasks/entities/task.entity';
import { Marking } from '../markings/entities/marking.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    private dataSource: DataSource,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentsRepository.save(createStudentDto);
  }

  async findAll(): Promise<Student[]> {
    // return await this.studentsRepository.find();

    const students = await this.dataSource
      .getRepository(Student)
      .createQueryBuilder('student')
      .leftJoin('student.studentToExam', 'exams')
      .addSelect(['exams.examId', 'exams.marking'])
      .leftJoinAndMapOne('exams.examId', Exam, 'exam', 'exam.id = exams.examId')
      .leftJoin('student.studentToTask', 'tasks')
      .addSelect(['tasks.taskId', 'tasks.markingId'])
      .leftJoinAndMapOne('tasks.taskId', Task, 'task', 'task.id = tasks.taskId')
      .leftJoinAndMapOne(
        'tasks.markingId',
        Marking,
        'marking',
        'marking.id = tasks.markingId',
      )
      .getMany();

    return students;
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { id },
    });

    if (!student) throw new NotFoundException('Student not found');

    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsRepository.preload({
      id,
      ...updateStudentDto,
    });

    if (!student) throw new NotFoundException('Student not found');

    return await this.studentsRepository.save(student);
  }

  async remove(id: number): Promise<Student> {
    const student = await this.findOne(id);

    if (!student) throw new NotFoundException('Student not found');

    return this.studentsRepository.remove(student);
  }
}
