import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { LibraryCard } from './LibraryCard';
import { Type } from '../../services/interfaces';
import { Tutor } from './Tutor';

@Entity('exercise')
export class Exercise extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'exercise_type',
  })
  exerciseType: string;

  @Column({
    name: 'content',
    type: 'json',
    nullable: false,
    default: [],
  })
  content: any[];

  @Column({
    name: 'type',
    enum: Type,
    default: Type.Public,
  })
  type: Type;

  @ManyToOne(() => LibraryCard, (libraryCard) => libraryCard.exercises)
  libraryCard: LibraryCard;

  @ManyToOne(() => Tutor, (tutor) => tutor.exercises)
  tutor: Tutor;
}
