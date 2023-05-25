import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Shifts } from '../enums/shifts.enum';

@Entity('courses')
@Index(['year', 'shift'], { unique: true })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  shift: Shifts;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Student, (student) => student.course)
  students: Student[];
}
