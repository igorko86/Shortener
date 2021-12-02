import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { PlanCard } from './PlanCard';

@Entity('plan')
export class Plan extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'plan_name',
  })
  planName: string;

  @Column({
    name: 'group_id',
    type: 'uuid',
  })
  groupId: string;

  @Column({
    type: 'text',
    nullable: false,
    array: true,
    default: [],
  })
  planCardIds: string[];

  @OneToMany(() => PlanCard, (planCard) => planCard.plan)
  planCards: PlanCard[];
}
