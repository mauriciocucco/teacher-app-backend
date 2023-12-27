import { Module } from '@nestjs/common';
import { StudentToWorkService } from './student-to-work.service';
import { StudentToWorkController } from './student-to-work.controller';

@Module({
  controllers: [StudentToWorkController],
  providers: [StudentToWorkService]
})
export class StudentToWorkModule {}
