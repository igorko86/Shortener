import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Plan } from './Plan';
import { SubCard } from './SubCard';

@Entity('planCard')
export class PlanCard extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'plan_card_name',
  })
  planCardName: string;

  @Column({
    name: 'library_card_ids',
    type: 'text',
    nullable: false,
    array: true,
    default: [],
  })
  libraryCardIds: string[];

  @ManyToOne(() => Plan, (plan) => plan.planCards)
  plan: Plan;

  @OneToMany(() => SubCard, (subCard) => subCard.planCard)
  subCards: SubCard[];
}
