import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Marking } from '../../markings/entities/marking.entity';

@Entity()
export class StudentToTask {
  @PrimaryGeneratedColumn()
  public studentToTaskId: number;

  @Column()
  public studentId: number;

  @Column()
  public taskId: number;

  @ManyToOne(() => Marking, (marking) => marking.studentToTask)
  public marking: Marking;

  @ManyToOne(() => Student, (student) => student.studentToTask)
  public student: Student;

  @ManyToOne(() => Task, (task) => task.studentToTask)
  public task: Task;
}
