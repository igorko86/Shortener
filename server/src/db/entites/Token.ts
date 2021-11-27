import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'uuid',
  })
  tutorId: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.tokens)
  @JoinColumn({
    name: 'tutor_id',
  })
  tutor: Tutor;
}
