import { Module } from '@nestjs/common';
import { StudentToExamService } from './student-to-exam.service';
import { StudentToExamController } from './student-to-exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentToExam } from './entities/student-to-exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentToExam])],
  controllers: [StudentToExamController],
  providers: [StudentToExamService],
})
export class StudentToExamModule {}
