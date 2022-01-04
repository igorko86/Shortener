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
    type: 'jsonb',
    nullable: false,
    array: true,
    default: [],
  })
  // eslint-disable-next-line @typescript-eslint/ban-types
  content: object[];

  @ManyToOne(() => LibraryCard, (libraryCard) => libraryCard.exercises)
  libraryCard: LibraryCard;
}
