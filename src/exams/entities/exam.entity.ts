import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { StudentToExam } from '../../student-to-exam/entities/student-to-exam.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('exams')
export class Exam {
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

  @ManyToOne(() => Subject, (subject) => subject.exams)
  subject: Subject;

  @OneToMany(() => StudentToExam, (studentToExam) => studentToExam.exam)
  public studentToExam: StudentToExam[];

  @ManyToOne(() => Course, (course) => course.exams)
  course: Course;
}
