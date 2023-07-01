import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { checkHash } from '../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findOneByEmail(loginDto.email);
      const isMatch = await checkHash(loginDto.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException(
          'You do not have the right credentials',
        );
      }

      const payload = { sub: user.id, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
