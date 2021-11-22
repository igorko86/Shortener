import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../common/Persone';
import { LibraryCard } from './LibraryCard';
import { Tutor } from './Tutor';

@Entity('token')
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'refresh_token',
  })
  refreshToken: string;

  @Column({
    name: 'tutor_id',
  })
  tutorId: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.tokens)
  @JoinColumn({
    name: 'tutor_id',
  })
  tutor: Tutor;
}
