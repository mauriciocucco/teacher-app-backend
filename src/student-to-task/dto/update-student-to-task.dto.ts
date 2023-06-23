import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentToTaskDto } from './create-student-to-task.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentToTaskDto extends PartialType(
  CreateStudentToTaskDto,
) {
  @ApiProperty({ description: 'The observation for the student task' })
  @IsOptional()
  @IsString()
  public observation: string;

  @ApiProperty({ description: 'The marking id' })
  @IsOptional()
  @IsNumber()
  public markingId: number;
}
