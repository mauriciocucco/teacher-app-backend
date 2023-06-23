import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { UpdateStudentToTaskDto } from '../../student-to-task/dto/update-student-to-task.dto';

export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, ['studentToTask']),
) {
  @ApiProperty({ description: 'The relationship with a student' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateStudentToTaskDto)
  readonly studentToTask: UpdateStudentToTaskDto[];
}
