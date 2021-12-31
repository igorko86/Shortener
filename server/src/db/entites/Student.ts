import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { User } from './User';
import { Group } from './Group';
import { Tutor } from './Tutor';

@Entity('student')
export class Student extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.students)
  user: User;

  @ManyToOne(() => Group, (group) => group.students)
  group: Group;

  @ManyToOne(() => Tutor, (tutor) => tutor.students)
  tutor: Tutor;
}
