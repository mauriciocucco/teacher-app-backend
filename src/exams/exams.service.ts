import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { FindExamsFiltersDto } from './dto/find-exams-filters.dto';
import { Filters, cleanFilters } from '../utils/clean-filters';
import { addDateRange } from '../utils/date-range-filter';
import { Course } from '../courses/entities/course.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { CreateStudentToExamDto } from '../student-to-exam/dto/create-student-to-exam.dto';
import { StudentToExam } from '../student-to-exam/entities/student-to-exam.entity';
import { Student } from '../students/entities/student.entity';
import { updateExistingStudentToTask } from '../utils/update-existing-student-to-task';
import { WorkType } from '../enums/work-type.enum';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examsRepository: Repository<Exam>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(StudentToExam)
    private studentToExamRepository: Repository<StudentToExam>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    try {
      const existingCourse = await this.courseRepository.findOneByOrFail({
        id: createExamDto.course,
      });
      const existingSubject = await this.subjectRepository.findOneByOrFail({
        id: createExamDto.subject,
      });
      const studentToExam = await Promise.all(
        createExamDto.studentToExam.map((studentToExam) =>
          this.createStudentToExam(studentToExam),
        ),
      );
      const newTask = await this.examsRepository.create({
        ...createExamDto,
        course: existingCourse,
        subject: existingSubject,
        studentToExam,
      });

      return await this.examsRepository.save(newTask);
    } catch (error) {
      console.error('Hubo un error en create de Task: ', error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async findAll(filters: FindExamsFiltersDto): Promise<Exam[]> {
    const cleanedFilters = cleanFilters(filters as unknown as Filters);
    const filterWithDate = addDateRange(cleanedFilters);

    return await this.examsRepository.find({
      where: filterWithDate,
      relations: {
        studentToExam: {
          student: true,
        },
        course: true,
        subject: true,
      },
      // loadRelationIds: {
      //   relations: ['course', 'subject'],
      // },
      select: {
        course: {
          id: true,
        },
        subject: {
          id: true,
        },
      },
      order: {
        date: 'DESC',
      },
      cache: true,
    });
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.examsRepository.findOne({
      where: { id },
      relations: {
        studentToExam: {
          student: true,
        },
        course: true,
        subject: true,
      },
      loadRelationIds: {
        relations: ['course', 'subject'],
      },
    });

    if (!exam) throw new NotFoundException('Exam not found');

    return exam;
  }

  async update(id: number, updateRequest: UpdateExamDto): Promise<Exam> {
    try {
      const exam = await this.examsRepository.findOne({
        where: { id },
        relations: {
          studentToExam: true,
        },
      });

      if (!exam) throw new NotFoundException('Exam not found');

      if (updateRequest.studentToExam) {
        updateExistingStudentToTask(
          exam.studentToExam,
          updateRequest.studentToExam,
          WorkType.EXAM,
        );
      }

      const deepUpdateRequestClone = JSON.parse(JSON.stringify(updateRequest));
      const updatedExam = await this.examsRepository.preload({
        ...exam,
        ...deepUpdateRequestClone,
        studentToExam: [...exam.studentToExam],
      });

      if (!updatedExam) throw new NotFoundException('Exam not found');

      return await this.examsRepository.save(updatedExam);
    } catch (error) {
      console.error(error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async remove(id: number): Promise<Exam> {
    const exam = await this.findOne(id);

    if (!exam) throw new NotFoundException('Exam not found');

    return this.examsRepository.remove(exam);
  }

  private async createStudentToExam(studentToExam: CreateStudentToExamDto) {
    try {
      const student = await this.studentRepository.findOneByOrFail({
        id: studentToExam.studentId,
      });

      return this.studentToExamRepository.create({
        ...studentToExam,
        student,
      });
    } catch (error) {
      throw error;
    }
  }
}
