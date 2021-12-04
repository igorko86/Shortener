import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { SubCard } from './SubCard';

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

  @OneToMany(() => SubCard, (subCard) => subCard.library)
  subCards: SubCard[];
}
