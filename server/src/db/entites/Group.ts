import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Tutor } from './Tutor';
import { Student } from './Student';

@Entity('group')
export class Group extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'group_name',
  })
  groupName: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.groups)
  tutor: Tutor;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];
}
