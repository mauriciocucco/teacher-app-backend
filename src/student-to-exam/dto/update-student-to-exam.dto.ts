import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentToExamDto } from './create-student-to-exam.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentToExamDto extends PartialType(
  CreateStudentToExamDto,
) {
  @ApiProperty({ description: 'The observation for the student' })
  @IsOptional()
  @IsString()
  public observation: string;

  @ApiProperty({ description: 'The exam marking' })
  @IsOptional()
  @IsNumber()
  public marking: number;
}
