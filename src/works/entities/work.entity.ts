import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { Course } from '../../courses/entities/course.entity';
import { StudentToWork } from '../../student-to-work/entities/student-to-work.entity';
import { WorkType } from '../../work-types/entities/work-type.entity';

@Entity('works')
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'work_type_id' })
  workTypeId: number;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', precision: 3 })
  date: string;

  @Column()
  courseId: number;

  @Column()
  subjectId: number;

  @OneToOne(() => WorkType, (workType) => workType.works)
  @JoinColumn({ name: 'work_type_id', referencedColumnName: 'id' })
  workType: Relation<WorkType>;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  @JoinColumn()
  subject: Relation<Subject>;

  @ManyToOne(() => Course, (course) => course.tasks)
  @JoinColumn()
  course: Relation<Course>;

  @OneToMany(() => StudentToWork, (studentToWork) => studentToWork.work, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  public studentToWork: StudentToWork[];
}
