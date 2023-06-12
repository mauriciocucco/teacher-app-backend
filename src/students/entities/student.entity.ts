import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { Course } from '../../courses/entities/course.entity';
import { StudentToTask } from '../../student-to-task/entities/student-to-task.entity';
import { StudentToExam } from '../../student-to-exam/entities/student-to-exam.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  courseId: number;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinTable()
  public course: Course;

  @OneToMany(() => StudentToTask, (studentToTask) => studentToTask.student)
  public studentToTask: StudentToTask[];

  @OneToMany(() => StudentToExam, (studentToExam) => studentToExam.student)
  public studentToExam: StudentToExam[];

  @ManyToMany(() => Subject, (subject) => subject.students)
  @JoinTable({
    name: 'student_subjects', // table name for the junction table of this relation
    joinColumn: {
      name: 'studentId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subjectId',
      referencedColumnName: 'id',
    },
  })
  subjects: Subject[];
}
