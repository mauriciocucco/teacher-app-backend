import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMarkingDto {
  @ApiProperty({ description: 'The marking name' })
  @IsString()
  readonly name: string;
}
