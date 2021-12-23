import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Tutor } from './Tutor';

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
}
