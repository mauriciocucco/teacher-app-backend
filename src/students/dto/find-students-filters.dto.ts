import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FindStudentsFiltersDto {
  @ApiProperty({ description: 'The students course' })
  @IsNumberString()
  @IsOptional()
  readonly courseId: string = '0';
}
