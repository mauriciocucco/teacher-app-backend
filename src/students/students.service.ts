import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DataSource, Repository } from 'typeorm';
import { FindStudentsFiltersDto } from './dto/find-students-filters.dto';
import { Filters, cleanFilters } from '../utils/clean-filters';
import { Course } from '../courses/entities/course.entity';
import { addDateRange } from '../utils/date-range-filter';
import { UNDELIVERED_MARKINGS } from '../works/constants/undelivered.const';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private dataSource: DataSource,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const existingCourse = await this.courseRepository.findOneByOrFail({
        id: createStudentDto.course,
      });
      const newStudent = await this.studentsRepository.create({
        ...createStudentDto,
        course: existingCourse,
      });

      return await this.studentsRepository.save(newStudent);
    } catch (error) {
      console.error('Hubo un error en create de Task: ', error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async findAll(filters: FindStudentsFiltersDto): Promise<Student[]> {
    const cleanedFilters = cleanFilters(filters as unknown as Filters);
    const { courseId, subjectId, date } = addDateRange(cleanedFilters);

    const studentsQuery = this.dataSource
      .getRepository(Student)
      .createQueryBuilder('student')
      .leftJoin('student.studentToWork', 'studentToWork')
      .addSelect([
        'studentToWork.workId',
        'studentToWork.observation',
        'studentToWork.onTime',
        'studentToWork.score',
        'studentToWork.markingId',
      ])
      .leftJoinAndSelect('studentToWork.work', 'work')
      .loadRelationCountAndMap(
        'work.totalDelivered',
        'work.studentToWork',
        'studentToWork',
        (qb) =>
          qb.where('studentToWork.markingId NOT IN (:...markingIds)', {
            markingIds: UNDELIVERED_MARKINGS,
          }),
      );

    if (courseId) {
      studentsQuery.andWhere('student.courseId = :courseId', {
        courseId,
      });
    }

    if (subjectId) {
      studentsQuery.andWhere('work.subjectId = :subjectId', {
        subjectId,
      });
    }

    if (date?._value?.length > 0) {
      studentsQuery.andWhere('work.date BETWEEN :startDate AND :endDate', {
        startDate: date._value[0],
        endDate: date._value[1],
      });
    }

    return await studentsQuery
      .orderBy('student.lastname', 'ASC')
      .cache(true)
      .getMany();
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
    try {
      const existingCourse = await this.courseRepository.findOneByOrFail({
        id: updateStudentDto.course,
      });
      const student = await this.studentsRepository.preload({
        id,
        ...updateStudentDto,
        course: existingCourse,
      });

      if (!student) throw new NotFoundException('Student not found');

      return await this.studentsRepository.save(student);
    } catch (error) {
      console.error(error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async remove(id: number): Promise<Student> {
    const student = await this.findOne(id);

    if (!student) throw new NotFoundException('Student not found');

    return this.studentsRepository.remove(student);
  }

  async findPerformance(studentId: number) {
    try {
      const studentPerformance = await this.studentsRepository
        .createQueryBuilder('student')
        .leftJoin('student.course', 'course')
        .addSelect(['course.id'])
        .leftJoin('student.studentToTask', 'tasks')
        .leftJoin('tasks.task', 'task')
        .leftJoin('task.subject', 'subject')
        .addSelect(['subject.id', 'subject.name'])
        .leftJoin('tasks.marking', 'marking')
        .addSelect(['COUNT(*)', 'marking.description', 'marking.id'])
        .where('student.id = :studentId', { studentId })
        .groupBy('student.id')
        .addGroupBy('course.id')
        .addGroupBy('tasks.studentId')
        .addGroupBy('subject.id')
        .addGroupBy('marking.id')
        .getRawMany();

      return studentPerformance;
    } catch (error) {
      console.log('findPerformance error: ', error);

      throw error;
    }
  }
}
