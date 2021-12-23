import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { SubCard } from './SubCard';

@Entity('library_card')
export class LibraryCard extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'html_content' })
  htmlContent: string;

  @OneToMany(() => SubCard, (subCard) => subCard.library)
  subCards: SubCard[];
}
