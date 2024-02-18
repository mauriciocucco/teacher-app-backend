import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ description: 'The name of the student' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The lastname of the student' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ description: 'The course of the student' })
  @IsNumber()
  readonly course: number;
}
