import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindTasksFiltersDto {
  @ApiProperty({ description: 'The task subject id' })
  @IsNumber()
  @IsOptional()
  readonly subject: number = 0;

  @ApiProperty({ description: 'The task subject id' })
  @IsNumber()
  @IsOptional()
  readonly courseId: number = 0;

  @ApiProperty({ description: 'The range start of the task' })
  @IsNumberString()
  @IsOptional()
  startDate: number | string = '0';

  @ApiProperty({ description: 'The range end of the task' })
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
