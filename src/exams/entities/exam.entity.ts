import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { StudentToExam } from '../../student-to-exam/entities/student-to-exam.entity';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Subject, (subject) => subject.exams)
  subject: Subject;

  @OneToMany(() => StudentToExam, (studentToExam) => studentToExam.exam)
  public studentToExam: StudentToExam[];
}
