import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Work } from '../../works/entities/work.entity';

@Entity('work_types')
export class WorkType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Work, (work) => work.workType)
  @JoinColumn({ name: 'id', referencedColumnName: 'work_type_id' })
  works: Work[];
}
