import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateStudentToWorkDto } from '../../student-to-work/dto/create-student-to-work.dto';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateWorkDto {
  @ApiProperty({ description: 'The work name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The work description' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: 'The work date' })
  @IsDateString()
  readonly date: string;

  @ApiProperty({ description: 'The work type' })
  @IsNumber()
  readonly workTypeId: number;

  @ApiProperty({ description: 'The work subject id' })
  @IsNumber()
  readonly subjectId: number;

  @ApiProperty({ description: 'The work course id' })
  @IsNumber()
  readonly courseId: number;

  @ApiProperty({ description: 'The relationship with the students' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStudentToWorkDto)
  readonly studentToWork: CreateStudentToWorkDto[];
}
