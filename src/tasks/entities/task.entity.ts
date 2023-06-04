import {
  Column,
  Entity,
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
  date: Date;

  @Column()
  courseId: number;

  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  subject: Subject;

  @OneToMany(() => StudentToTask, (studentToTask) => studentToTask.task, {
    cascade: true,
  })
  public studentToTask: StudentToTask[];

  @ManyToOne(() => Course, (course) => course.tasks)
  course: Course;
}
