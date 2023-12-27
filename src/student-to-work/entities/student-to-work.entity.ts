import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Marking } from '../../markings/entities/marking.entity';
import { Student } from '../../students/entities/student.entity';
import { Work } from '../../works/entities/work.entity';

@Entity()
export class StudentToWork {
  @PrimaryColumn({ unique: true })
  public studentId: number;

  @PrimaryColumn({ unique: true })
  public workId: number;

  @Column({ nullable: true })
  public observation: string;

  @Column({ name: 'on_time', nullable: true, default: false })
  public onTime: boolean;

  @Column({ type: 'decimal', nullable: true })
  public score: number;

  @Column({ nullable: true, default: 17 })
  public markingId: number;

  @ManyToOne(() => Marking, (marking) => marking.studentToWork, {
    nullable: true,
  })
  @JoinColumn()
  public marking: Relation<Marking>;

  @ManyToOne(() => Student, (student) => student.studentToWork)
  @JoinColumn()
  public student: Relation<Student>;

  @ManyToOne(() => Work, (work) => work.studentToWork, { onDelete: 'CASCADE' })
  @JoinColumn()
  public work: Relation<Work>;
}
