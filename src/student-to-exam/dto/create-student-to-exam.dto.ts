import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStudentToExamDto {
  @ApiProperty({ description: 'The student id' })
  @IsNumber()
  public student: number;
}
