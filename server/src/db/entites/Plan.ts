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
    name: 'plan_card_ids',
    array: true,
    default: null,
  })
  planCardIds: string;

  @OneToMany(() => PlanCard, (planCard) => planCard.plan)
  planCards: PlanCard[];
}
