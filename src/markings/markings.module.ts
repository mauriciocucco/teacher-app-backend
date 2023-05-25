import { Module } from '@nestjs/common';
import { MarkingsService } from './markings.service';
import { MarkingsController } from './markings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marking } from './entities/marking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marking])],
  controllers: [MarkingsController],
  providers: [MarkingsService],
})
export class MarkingsModule {}
