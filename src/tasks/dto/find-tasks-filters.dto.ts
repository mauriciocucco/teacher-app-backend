import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindTasksFiltersDto {
  @ApiProperty({ description: 'The task subject id' })
  @IsNumber()
  @IsOptional()
  readonly subject: number = 0;

  @ApiProperty({ description: 'The task subject id' })
  @IsNumber()
  @IsOptional()
  readonly course: number = 0;

  @ApiProperty({ description: 'The range start of the task' })
  @IsNumberString()
  @IsOptional()
  startDate: number | string = '0';

  @ApiProperty({ description: 'The range end of the task' })
  @IsNumberString()
  @IsOptional()
  endDate: number | string = '0';
}
