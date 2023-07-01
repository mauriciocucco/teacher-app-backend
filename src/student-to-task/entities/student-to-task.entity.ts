import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Marking } from '../../markings/entities/marking.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class StudentToTask {
  @PrimaryColumn({ unique: true })
  public studentId: number;

  @PrimaryColumn({ unique: true })
  public taskId: number;

  @Column({ nullable: true })
  public observation: string;

  @Column({ nullable: true, default: 17 })
  markingId: number;

  @ManyToOne(() => Marking, (marking) => marking.studentToTask, {
    nullable: true,
  })
  @JoinColumn()
  public marking: Marking;

  @ManyToOne(() => Student, (student) => student.studentToTask)
  @JoinColumn()
  public student: Relation<Student>;

  @ManyToOne(() => Task, (task) => task.studentToTask, { onDelete: 'CASCADE' })
  @JoinColumn()
  public task: Relation<Task>;
}
