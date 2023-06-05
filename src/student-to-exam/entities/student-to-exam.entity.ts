import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class StudentToExam {
  @PrimaryGeneratedColumn()
  public studentToExamId: number;

  @Column()
  public studentId: number;

  @Column()
  public examId: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  public marking: number;

  @Column({ nullable: true })
  public observation: string;

  @ManyToOne(() => Student, (student) => student.studentToExam)
  public student: Student;

  @ManyToOne(() => Exam, (task) => task.studentToExam)
  public exam: Exam;
}
