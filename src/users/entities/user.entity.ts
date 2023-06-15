import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from '../enums/roles.enum';
import { Course } from '../../courses/entities/course.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: Roles;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];
}
