import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentToWorkDto } from './create-student-to-work.dto';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateStudentToWorkDto extends PartialType(
  CreateStudentToWorkDto,
) {
  @ApiProperty({ description: 'The observation for the student work' })
  @IsOptional()
  @IsString()
  public observation: string;

  @ApiProperty({ description: 'If student has delivered the work on time' })
  @IsOptional()
  @IsBoolean()
  readonly onTime: boolean;

  @ApiProperty({ description: 'The work score' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  public score: number;

  @ApiProperty({ description: 'The marking id' })
  @IsOptional()
  @IsNumber()
  public markingId: number;
}
