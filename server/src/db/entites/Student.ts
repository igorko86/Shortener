import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { User } from './User';
import { Tutor } from './Tutor';
import { StudentGroup } from './StudentGroup';

@Entity('student')
export class Student extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.students, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Tutor, (tutor) => tutor.students)
  tutor: Tutor;

  @OneToMany(() => StudentGroup, (studentGroup) => studentGroup.student)
  studentGroups: StudentGroup[];
}
