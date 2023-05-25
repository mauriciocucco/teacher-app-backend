import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkingDto } from './dto/create-marking.dto';
import { UpdateMarkingDto } from './dto/update-marking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marking } from './entities/marking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarkingsService {
  constructor(
    @InjectRepository(Marking)
    private markingsRepository: Repository<Marking>,
  ) {}

  async create(createMarkingDto: CreateMarkingDto): Promise<Marking> {
    return await this.markingsRepository.save(createMarkingDto);
  }

  async findAll(): Promise<Marking[]> {
    return await this.markingsRepository.find();
  }

  async findOne(id: number): Promise<Marking> {
    const marking = await this.markingsRepository.findOne({
      where: { id },
    });

    if (!marking) throw new NotFoundException('Marking not found');

    return marking;
  }

  async update(
    id: number,
    updateMarkingDto: UpdateMarkingDto,
  ): Promise<Marking> {
    const marking = await this.markingsRepository.preload({
      id,
      ...updateMarkingDto,
    });

    if (!marking) throw new NotFoundException('Marking not found');

    return await this.markingsRepository.save(marking);
  }

  async remove(id: number): Promise<Marking> {
    const marking = await this.findOne(id);

    if (!marking) throw new NotFoundException('Marking not found');

    return this.markingsRepository.remove(marking);
  }
}
