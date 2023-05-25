import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  description: string;
}
