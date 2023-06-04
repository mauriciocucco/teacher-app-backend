import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateStudentToTaskDto } from './create-student-to-task.dto';

export class UpdateStudentToTaskDto extends PartialType(
  OmitType(CreateStudentToTaskDto, ['taskId']),
) {}
