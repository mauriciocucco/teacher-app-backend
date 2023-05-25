import { Module } from '@nestjs/common';
import { StudentToTaskService } from './student-to-task.service';
import { StudentToTaskController } from './student-to-task.controller';
import { StudentToTask } from './entities/student-to-task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentToTask])],
  controllers: [StudentToTaskController],
  providers: [StudentToTaskService],
})
export class StudentToTaskModule {}
