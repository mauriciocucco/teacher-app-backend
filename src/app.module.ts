import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import appConfig from './config/app.config';
import { DataSourceOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TasksModule } from './tasks/tasks.module';
import { MarkingsModule } from './markings/markings.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database');
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    StudentsModule,
    CoursesModule,
    SubjectsModule,
    TasksModule,
    MarkingsModule,
    ExamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
