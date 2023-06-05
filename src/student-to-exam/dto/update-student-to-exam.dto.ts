import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateStudentToExamDto } from './create-student-to-exam.dto';

export class UpdateStudentToExamDto extends PartialType(
  OmitType(CreateStudentToExamDto, ['examId']),
) {}
