import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { StudentToTask } from '../../student-to-task/entities/student-to-task.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', precision: 3 })
  date: string;

  @Column()
  courseId: number;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  @JoinColumn()
  subject: Subject;

  @ManyToOne(() => Course, (course) => course.tasks)
  @JoinColumn()
  course: Course;

  @OneToMany(() => StudentToTask, (studentToTask) => studentToTask.task, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  public studentToTask: StudentToTask[];
}
