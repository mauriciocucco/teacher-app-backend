import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Exam } from '../../exams/entities/exam.entity';

@Entity()
export class StudentToExam {
  @PrimaryGeneratedColumn()
  public studentToExamId: number;

  @Column()
  public studentId: number;

  @Column()
  public examId: number;

  @Column()
  public marking: number;

  @ManyToOne(() => Student, (student) => student.studentToExam)
  public student: Student;

  @ManyToOne(() => Exam, (task) => task.studentToExam)
  public exam: Exam;
}