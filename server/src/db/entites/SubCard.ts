import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Plan } from './Plan';
import { LibraryCard } from './LibraryCard';
import { PlanCard } from './PlanCard';

@Entity('subCard')
export class SubCard extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'card_id',
  })
  cardId: string;

  @Column({
    name: 'library_card_name',
  })
  libraryCardName: string;

  @Column({
    name: 'library_id',
  })
  libraryCardId: string;

  @ManyToOne(() => PlanCard, (planCard) => planCard.subCards)
  planCard: PlanCard;

  @ManyToOne(() => LibraryCard, (library) => library.subCards)
  library: LibraryCard;
}
