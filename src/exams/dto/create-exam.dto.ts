import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

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
  readonly date: Date;

  @ApiProperty({ description: 'The task subject' })
  @IsNumber()
  readonly subjectId: number;

  @ApiProperty({ description: 'The task course' })
  @IsNumber()
  readonly courseId: number;
}
