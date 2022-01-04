import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { LibraryCard } from './LibraryCard';

@Entity('exercise')
export class Exercise extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'type',
  })
  type: string;

  @Column({
    name: 'content',
    type: 'json',
    nullable: false,
    default: [],
  })
  content: any[];

  @ManyToOne(() => LibraryCard, (libraryCard) => libraryCard.exercises)
  libraryCard: LibraryCard;
}
