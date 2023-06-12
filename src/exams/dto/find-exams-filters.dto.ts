import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

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
}
