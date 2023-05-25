import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Student } from '../../students/entities/student.entity';
import { Exam } from '../../exams/entities/exam.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Task, (task) => task.subject)
  tasks: Task[];

  @OneToMany(() => Exam, (exam) => exam.subject)
  exams: Exam[];

  @ManyToMany(() => Student, (student) => student.subjects)
  students: Student[];
}
