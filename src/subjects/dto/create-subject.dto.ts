import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ description: 'The subject name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The subject description' })
  @IsString()
  readonly description: string;
}
