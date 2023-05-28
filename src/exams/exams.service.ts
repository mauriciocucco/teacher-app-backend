import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { FindExamsFiltersDto } from './dto/find-exams-filters.dto';
import { Filters, cleanFilters } from '../utils/clean-filters';
import { addDateRange } from '../utils/date-range-filter';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examsRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return await this.examsRepository.save(createExamDto);
  }

  async findAll(filters: FindExamsFiltersDto): Promise<Exam[]> {
    const cleanedFilters = cleanFilters(filters as unknown as Filters);
    const filterWithDate = addDateRange(cleanedFilters);

    return await this.examsRepository.find({
      where: filterWithDate,
    });
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.examsRepository.findOne({
      where: { id },
    });

    if (!exam) throw new NotFoundException('Exam not found');

    return exam;
  }

  async update(id: number, updateExamDto: UpdateExamDto): Promise<Exam> {
    const exam = await this.examsRepository.preload({
      id,
      ...updateExamDto,
    });

    if (!exam) throw new NotFoundException('Exam not found');

    return await this.examsRepository.save(exam);
  }

  async remove(id: number): Promise<Exam> {
    const exam = await this.findOne(id);

    if (!exam) throw new NotFoundException('Exam not found');

    return this.examsRepository.remove(exam);
  }
}
