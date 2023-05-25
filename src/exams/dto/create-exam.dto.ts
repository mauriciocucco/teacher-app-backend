import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExamDto {
  @ApiProperty({ description: 'The exam name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The exam date' })
  @IsString()
  readonly date: string;
}
