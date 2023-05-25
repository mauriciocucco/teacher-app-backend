import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examsRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return await this.examsRepository.save(createExamDto);
  }

  async findAll(): Promise<Exam[]> {
    return await this.examsRepository.find();
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
