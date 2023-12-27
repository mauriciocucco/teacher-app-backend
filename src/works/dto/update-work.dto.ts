import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateWorkDto } from './create-work.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateStudentToWorkDto } from '../../student-to-work/dto/update-student-to-work.dto';

export class UpdateWorkDto extends PartialType(
  OmitType(CreateWorkDto, ['studentToWork']),
) {
  @ApiProperty({ description: 'The relationship with a student' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateStudentToWorkDto)
  readonly studentToWork: UpdateStudentToWorkDto[];
}
