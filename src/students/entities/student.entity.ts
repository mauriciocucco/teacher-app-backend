import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { Course } from '../../courses/entities/course.entity';
import { StudentToTask } from '../../student-to-task/entities/student-to-task.entity';
import { StudentToExam } from '../../student-to-exam/entities/student-to-exam.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  courseId: number;

  @ManyToMany(() => Subject, (subject) => subject.students)
  @JoinTable()
  subjects: Subject[];

  @OneToMany(() => StudentToTask, (studentToTask) => studentToTask.student)
  public studentToTask: StudentToTask[];

  @OneToMany(() => StudentToExam, (studentToExam) => studentToExam.student)
  public studentToExam: StudentToExam[];

  @ManyToOne(() => Course, (course) => course.students)
  public course: Course;
}
