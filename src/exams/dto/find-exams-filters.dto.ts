import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindExamsFiltersDto {
  @ApiProperty({ description: 'The exam subject id' })
  @IsNumber()
  @IsOptional()
  readonly subject: number = 0;

  @ApiProperty({ description: 'The exam subject id' })
  @IsNumber()
  @IsOptional()
  readonly courseId: number = 0;

  @ApiProperty({ description: 'The range start of the exam' })
  @IsNumberString()
  @IsOptional()
  startDate: number | string = '0';

  @ApiProperty({ description: 'The range end of the exam' })
  @IsNumberString()
  @IsOptional()
  endDate: number | string = '0';

  @ApiPropertyOptional({
    description: 'Page number',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Max number of records to return',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = 6;
}
