import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentToExamDto {
  @ApiProperty({ description: 'The student id' })
  @IsNumber()
  public studentId: number;

  @ApiProperty({ description: 'The examid' })
  @IsOptional()
  @IsNumber()
  public examId: number;

  @ApiProperty({ description: 'The observation for the student' })
  @IsOptional()
  @IsString()
  public observation: string;

  @ApiProperty({ description: 'The exam marking' })
  @IsOptional()
  @IsNumber()
  public marking: number;
}
