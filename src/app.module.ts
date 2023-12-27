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
import { StudentToTaskModule } from './student-to-task/student-to-task.module';
import { StudentToExamModule } from './student-to-exam/student-to-exam.module';
import { WorksModule } from './works/works.module';
import { StudentToWorkModule } from './student-to-work/student-to-work.module';
import { WorkTypesModule } from './work-types/work-types.module';

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
    StudentToTaskModule,
    StudentToExamModule,
    WorksModule,
    StudentToWorkModule,
    WorkTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
