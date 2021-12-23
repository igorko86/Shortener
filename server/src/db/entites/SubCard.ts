import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LibraryCard } from './LibraryCard';
import { PlanCard } from './PlanCard';

@Entity('sub_card')
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
    name: 'library_card_id',
  })
  libraryCardId: string;

  @ManyToOne(() => PlanCard, (planCard) => planCard.subCards)
  planCard: PlanCard;

  @ManyToOne(() => LibraryCard, (library) => library.subCards)
  library: LibraryCard;
}
