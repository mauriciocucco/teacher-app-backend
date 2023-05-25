import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentToTask } from '../../students/entities/student-to-task';

@Entity('markings')
export class Marking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => StudentToTask, (studentToTask) => studentToTask.marking)
  studentToTask: StudentToTask[];
}
