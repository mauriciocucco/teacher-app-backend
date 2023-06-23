import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateExamDto } from './create-exam.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateStudentToExamDto } from '../../student-to-exam/dto/update-student-to-exam.dto';

export class UpdateExamDto extends PartialType(
  OmitType(CreateExamDto, ['studentToExam']),
) {
  @ApiProperty({ description: 'The task course' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateStudentToExamDto)
  readonly studentToExam: UpdateStudentToExamDto[];
}
