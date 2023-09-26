import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindTasksFiltersDto {
  @ApiPropertyOptional({ description: 'The task subject id' })
  @IsNumber()
  @IsOptional()
  readonly subject: number = 0;

  @ApiPropertyOptional({ description: 'The task subject id' })
  @IsNumber()
  @IsOptional()
  readonly courseId: number = 0;

  @ApiPropertyOptional({ description: 'The range start of the task' })
  @IsNumberString()
  @IsOptional()
  startDate: number | string = '0';

  @ApiPropertyOptional({ description: 'The range end of the task' })
  @IsNumberString()
  @IsOptional()
  endDate: number | string = '0';
}
