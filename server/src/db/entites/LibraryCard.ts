import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { PlanCard } from './PlanCard';

@Entity('libraryCard')
export class LibraryCard extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  htmlContent: string;

  @ManyToOne(() => PlanCard, (planCard) => planCard.libraryCards)
  planCard: PlanCard;
}
