import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: 'The course year' })
  @IsNumber()
  readonly year: number;

  @ApiProperty({ description: 'The course description' })
  @IsString()
  readonly description: string;
}
