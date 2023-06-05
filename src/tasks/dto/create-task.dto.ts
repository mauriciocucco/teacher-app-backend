import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateStudentToTaskDto } from '../../student-to-task/dto/create-student-to-task.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty({ description: 'The task name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The task description' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: 'The task date' })
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
  @Type(() => CreateStudentToTaskDto)
  readonly studentToTask: CreateStudentToTaskDto[];
}
