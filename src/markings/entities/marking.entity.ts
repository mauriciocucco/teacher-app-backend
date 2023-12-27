import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentToWork } from '../../student-to-work/entities/student-to-work.entity';

@Entity('markings')
export class Marking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => StudentToWork, (studentToWork) => studentToWork.marking)
  studentToWork: StudentToWork[];
}
