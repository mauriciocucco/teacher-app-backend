import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentToTask } from './entities/student-to-task';
import { StudentToExam } from './entities/student-to-exam';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentToTask, StudentToExam])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
