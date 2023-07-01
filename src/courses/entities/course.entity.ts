import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Exam } from '../../exams/entities/exam.entity';
import { User } from '../../users/entities/user.entity';
import { JoinColumn } from 'typeorm';

@Entity('courses')
@Index(['year', 'shift'], { unique: true })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  shift: string;

  @Column({ nullable: true })
  description: string;

  @Column({ select: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn()
  public user: Relation<User>;

  @OneToMany(() => Student, (student) => student.course)
  students: Student[];

  @OneToMany(() => Task, (task) => task.course)
  tasks: Task[];

  @OneToMany(() => Exam, (exam) => exam.course)
  exams: Exam[];
}
