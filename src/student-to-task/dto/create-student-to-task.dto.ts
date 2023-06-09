import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStudentToTaskDto {
  @ApiProperty({ description: 'The student id' })
  @IsNumber()
  public studentId: number;
}
