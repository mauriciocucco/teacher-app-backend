import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectsRepository.save(createSubjectDto);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectsRepository.find();
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({
      where: { id },
    });

    if (!subject) throw new NotFoundException('Subject not found');

    return subject;
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.subjectsRepository.preload({
      id,
      ...updateSubjectDto,
    });

    if (!subject) throw new NotFoundException('Subject not found');

    return await this.subjectsRepository.save(subject);
  }

  async remove(id: number): Promise<Subject> {
    const subject = await this.findOne(id);

    if (!subject) throw new NotFoundException('Subject not found');

    return this.subjectsRepository.remove(subject);
  }
}
