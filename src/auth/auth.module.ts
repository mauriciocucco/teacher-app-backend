import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('jwt');
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
