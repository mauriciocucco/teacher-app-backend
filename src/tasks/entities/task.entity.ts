import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { StudentToTask } from '../../students/entities/student-to-task';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  start_date: string;

  @Column()
  delivery_date: string;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  subject: Subject;

  @OneToMany(() => StudentToTask, (studentToTask) => studentToTask.task)
  public studentToTask: StudentToTask[];
}