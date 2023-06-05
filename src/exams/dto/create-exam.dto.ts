import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateStudentToExamDto } from '../../student-to-exam/dto/create-student-to-exam.dto';

export class CreateExamDto {
  @ApiProperty({ description: 'The exam name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The exam description' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: 'The exam date' })
  @IsDateString()
  readonly date: string;

  @ApiProperty({ description: 'The task subject' })
  @IsNumber()
  readonly subjectId: number;

  @ApiProperty({ description: 'The task course' })
  @IsNumber()
  readonly courseId: number;

  @ApiProperty({ description: 'The relationship with the students' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStudentToExamDto)
  readonly studentToExam: CreateStudentToExamDto[];
}
