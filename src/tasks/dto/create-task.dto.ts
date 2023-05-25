import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The task name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The task description' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'The task start date' })
  @IsString()
  readonly start_date: string;

  @ApiProperty({ description: 'The task delivery date' })
  @IsString()
  readonly delivery_date: string;
}
