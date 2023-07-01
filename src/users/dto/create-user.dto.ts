import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The role of the user' })
  @IsEnum(Roles)
  readonly role: string;
}
