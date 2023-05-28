import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FindExamsFiltersDto {
  @ApiProperty({ description: 'The exam subject' })
  @IsNumberString()
  @IsOptional()
  readonly subjectId: string = '0';

  @ApiProperty({ description: 'The exam subject' })
  @IsNumberString()
  @IsOptional()
  readonly courseId: string = '0';

  @ApiProperty({ description: 'The range start of the exam' })
  @IsNumberString()
  @IsOptional()
  startDate: number | string = '0';

  @ApiProperty({ description: 'The range end of the exam' })
  @IsNumberString()
  @IsOptional()
  endDate: number | string = '0';
}
