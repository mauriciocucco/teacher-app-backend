import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Shifts } from '../enums/shifts.enum';

export class CreateCourseDto {
  @ApiProperty({ description: 'The course year' })
  @IsNumber()
  readonly year: number;

  @ApiProperty({ description: 'The course shift' })
  @IsEnum(Shifts)
  readonly shift: Shifts;

  @ApiProperty({ description: 'The course description' })
  @IsString()
  @IsOptional()
  readonly description: string;
}
