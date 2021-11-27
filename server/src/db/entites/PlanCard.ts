import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Plan } from './Plan';
import { LibraryCard } from './LibraryCard';

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
    array: true,
    default: null,
  })
  libraryCardIds: string;

  @ManyToOne(() => Plan, (plan) => plan.planCards)
  plan: Plan;

  @OneToMany(() => LibraryCard, (libraryCard) => libraryCard.planCard)
  libraryCards: LibraryCard[];
}
