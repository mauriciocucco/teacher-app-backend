import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ description: 'The subject name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The subject description' })
  @IsString()
  @IsOptional()
  readonly description: string;
}
