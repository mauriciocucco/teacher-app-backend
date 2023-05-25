import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.coursesRepository.save(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return await this.coursesRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id },
    });

    if (!course) throw new NotFoundException('Course not found');

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.coursesRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!course) throw new NotFoundException('Course not found');

    return await this.coursesRepository.save(course);
  }

  async remove(id: number): Promise<Course> {
    const course = await this.findOne(id);

    if (!course) throw new NotFoundException('Course not found');

    return this.coursesRepository.remove(course);
  }
}
