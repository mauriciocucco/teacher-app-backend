import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { StudentToTask } from './student-to-task';
import { StudentToExam } from './student-to-exam';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @ManyToMany(() => Subject, (subject) => subject.students)
  @JoinTable()
  subjects: Subject[];

  @OneToMany(() => StudentToTask, (studentToTask) => studentToTask.student)
  public studentToTask: StudentToTask[];

  @OneToMany(() => StudentToExam, (studentToExam) => studentToExam.student)
  public studentToExam: StudentToExam[];
}
