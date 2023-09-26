import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindExamsFiltersDto {
  @ApiPropertyOptional({ description: 'The exam subject id' })
  @IsNumber()
  @IsOptional()
  readonly subject: number = 0;

  @ApiPropertyOptional({ description: 'The exam subject id' })
  @IsNumber()
  @IsOptional()
  readonly courseId: number = 0;

  @ApiPropertyOptional({ description: 'The range start of the exam' })
  @IsNumberString()
  @IsOptional()
  startDate: number | string = '0';

  @ApiPropertyOptional({ description: 'The range end of the exam' })
  @IsNumberString()
  @IsOptional()
  endDate: number | string = '0';
}
