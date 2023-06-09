import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class StudentToExam {
  @PrimaryColumn({ unique: true })
  public studentId: number;

  @PrimaryColumn({ unique: true })
  public examId: number;

  @Column({ type: 'decimal', nullable: true })
  public marking: number;

  @Column({ nullable: true })
  public observation: string;

  @ManyToOne(() => Student, (student) => student.studentToExam)
  @JoinColumn()
  public student: Student;

  @ManyToOne(() => Exam, (task) => task.studentToExam, { onDelete: 'CASCADE' })
  @JoinColumn()
  public exam: Exam;
}
