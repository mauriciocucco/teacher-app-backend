import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Marking } from '../../markings/entities/marking.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
@Index(['student', 'task'], { unique: true })
export class StudentToTask {
  @PrimaryColumn()
  public studentId: number;

  @PrimaryColumn()
  public taskId: number;

  @Column({ nullable: true })
  public observation: string;

  @Column({ nullable: true })
  markingId: number;

  @ManyToOne(() => Marking, (marking) => marking.studentToTask, {
    nullable: true,
  })
  @JoinColumn()
  public marking: Marking;

  @ManyToOne(() => Student, (student) => student.studentToTask)
  @JoinColumn()
  public student: Student;

  @ManyToOne(() => Task, (task) => task.studentToTask, { onDelete: 'CASCADE' })
  @JoinColumn()
  public task: Task;
}
