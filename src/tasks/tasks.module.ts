import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/entities/course.entity';
import { Student } from '../students/entities/student.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { StudentToTask } from '../student-to-task/entities/student-to-task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Course, Student, Subject, StudentToTask]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
