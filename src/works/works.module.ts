import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Course } from '../courses/entities/course.entity';
import { Student } from '../students/entities/student.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { StudentToWork } from '../student-to-work/entities/student-to-work.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Work, Course, Student, Subject, StudentToWork]),
  ],
  controllers: [WorksController],
  providers: [WorksService],
})
export class WorksModule {}
