import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The task name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The task description' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: 'The task date' })
  @IsDateString()
  readonly date: Date;
}
