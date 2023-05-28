import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Shifts } from '../enums/shifts.enum';
import { Task } from '../../tasks/entities/task.entity';
import { Exam } from '../../exams/entities/exam.entity';

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

  @OneToMany(() => Task, (task) => task.course)
  tasks: Task[];

  @OneToMany(() => Exam, (exam) => exam.course)
  exams: Exam[];
}
