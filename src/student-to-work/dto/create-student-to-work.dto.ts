import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStudentToWorkDto {
  @ApiProperty({ description: 'The student id' })
  @IsNumber()
  public studentId: number;
}
