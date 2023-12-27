import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindStudentsFiltersDto {
  @ApiProperty({ description: 'The students course' })
  @IsNumber()
  @IsOptional()
  readonly courseId: number = 0;

  @ApiProperty({ description: 'The work subject id' })
  @IsNumber()
  @IsOptional()
  readonly subjectId: number = 0;

  @ApiProperty({ description: 'The range start of the work' })
  @IsNumberString()
  @IsOptional()
  startDate: number | string = '0';

  @ApiProperty({ description: 'The range end of the work' })
  @IsNumberString()
  @IsOptional()
  endDate: number | string = '0';
}
