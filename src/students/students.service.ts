import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentsRepository.save(createStudentDto);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentsRepository.find();
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
