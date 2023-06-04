import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentToTaskDto {
  @ApiProperty({ description: 'The student id' })
  @IsNumber()
  public studentId: number;

  @ApiProperty({ description: 'The task id' })
  @IsOptional()
  @IsNumber()
  public taskId: number;

  @ApiProperty({ description: 'The observation for the student task' })
  @IsOptional()
  @IsString()
  public observation: string;

  @ApiProperty({ description: 'The marking id' })
  @IsOptional()
  @IsNumber()
  public markingId: number;
}
