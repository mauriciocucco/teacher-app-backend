import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
@Index(['student', 'exam'], { unique: true })
export class StudentToExam {
  @PrimaryGeneratedColumn()
  public studentToExamId: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  public marking: number;

  @Column({ nullable: true })
  public observation: string;

  @ManyToOne(() => Student, (student) => student.studentToExam)
  @JoinColumn()
  public student: Student;

  @ManyToOne(() => Exam, (task) => task.studentToExam)
  @JoinColumn()
  public exam: Exam;
}
