import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FindStudentsFiltersDto {
  @ApiProperty({ description: 'The students course' })
  @IsNumber()
  @IsOptional()
  readonly courseId: number = 0;
}
