import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Plan } from './Plan';

@Entity('group')
export class Group extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'group_name',
  })
  groupName: string;

  @Column({
    name: 'plan_id',
  })
  planId: string;

  @OneToOne(() => Plan)
  @JoinColumn()
  plan: Plan;
}
