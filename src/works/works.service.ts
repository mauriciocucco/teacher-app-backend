import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { Student } from '../students/entities/student.entity';
import { StudentToWork } from '../student-to-work/entities/student-to-work.entity';
import { CreateStudentToWorkDto } from '../student-to-work/dto/create-student-to-work.dto';
import { FindWorksFiltersDto } from '../work-types/dto/find-works-filters.dto';
import { Filters, cleanFilters } from '../utils/clean-filters';
import { addDateRange } from '../utils/date-range-filter';
import { UNDELIVERED_MARKINGS } from './constants/undeliverede.const';
import { updateExistingStudentToWork } from '../utils/update-existing-student-to-work';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(Work)
    private worksRepository: Repository<Work>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(StudentToWork)
    private studentToWorkRepository: Repository<StudentToWork>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createWorkDto: CreateWorkDto): Promise<Work> {
    try {
      const {
        courseId,
        subjectId,
        studentToWork: studentToWorkRequest,
      } = createWorkDto;
      const existingCourse = await this.courseRepository.findOneByOrFail({
        id: courseId,
      });
      const existingSubject = await this.subjectRepository.findOneByOrFail({
        id: subjectId,
      });
      const studentToWork = await Promise.all(
        studentToWorkRequest.map((studentToWork) =>
          this.createStudentToWork(studentToWork),
        ),
      );
      const newWork = await this.worksRepository.create({
        ...createWorkDto,
        course: existingCourse,
        subject: existingSubject,
        studentToWork,
      });

      return await this.worksRepository.save(newWork);
    } catch (error) {
      console.error('Hubo un error en create de Work: ', error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async findAll(filters: FindWorksFiltersDto): Promise<Work[]> {
    const cleanedFilters = cleanFilters(filters as unknown as Filters);
    const filterWithDate = addDateRange(cleanedFilters);

    return await this.worksRepository
      .createQueryBuilder('work')
      .leftJoinAndSelect('work.studentToWork', 'studentToWork')
      .loadRelationCountAndMap(
        'work.totalDelivered',
        'work.studentToWork',
        'studentToWork',
        (qb) =>
          qb.where('studentToWork.markingId NOT IN (:...markingIds)', {
            markingIds: UNDELIVERED_MARKINGS,
          }),
      )
      .addSelect(['*'])
      .orderBy('work.date', 'DESC')
      .where(filterWithDate)
      .getMany();
  }

  async findOne(id: number): Promise<Work> {
    const work = await this.worksRepository
      .createQueryBuilder('work')
      .leftJoinAndSelect('work.studentToWork', 'studentToWork')
      .loadRelationCountAndMap(
        'work.totalDelivered',
        'work.studentToWork',
        'studentToWork',
        (qb) =>
          qb.where('studentToWork.markingId NOT IN (:...markingIds)', {
            markingIds: UNDELIVERED_MARKINGS,
          }),
      )
      .addSelect(['*'])
      .where({ id })
      .getOne();

    if (!work) throw new NotFoundException('Work not found');

    return work;
  }

  async update(id: number, updateRequest: UpdateWorkDto): Promise<Work> {
    try {
      const work = await this.worksRepository.findOne({
        where: { id },
        relations: {
          studentToWork: true,
        },
      });

      if (!work) throw new NotFoundException('Work not found');

      work.studentToWork.forEach(
        (studentToWork) => (studentToWork.score = +studentToWork.score),
      );

      if (updateRequest.studentToWork) {
        // con esta función actualizo el array de work.studentToWork
        updateExistingStudentToWork(
          work.studentToWork,
          updateRequest.studentToWork,
        );
      }

      const deepUpdateRequestClone = JSON.parse(JSON.stringify(updateRequest));
      const updatedWork = await this.worksRepository.preload({
        ...work,
        ...deepUpdateRequestClone,
        studentToWork: [...work.studentToWork], // el work.studenToWork se actualizó con updateExistingStudentToWork
      });

      if (!updatedWork) throw new NotFoundException('Work not found');

      return await this.worksRepository.save(updatedWork);
    } catch (error) {
      console.error(error);

      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || 500,
      );
    }
  }

  async remove(id: number): Promise<Work> {
    const work = await this.findOne(id);

    if (!work) throw new NotFoundException('Work not found');

    return this.worksRepository.remove(work);
  }

  private async createStudentToWork(studentToWork: CreateStudentToWorkDto) {
    try {
      const { studentId } = studentToWork;
      const student = await this.studentRepository.findOneByOrFail({
        id: studentId,
      });

      return this.studentToWorkRepository.create({
        ...studentToWork,
        student,
      });
    } catch (error) {
      throw error;
    }
  }
}
