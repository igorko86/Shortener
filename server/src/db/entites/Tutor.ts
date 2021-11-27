import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Token } from './Token';
import { CreateUpdateDate } from '../common/CreateUpdateDate';

@Entity('tutor')
export class Tutor extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Token, (token) => token.tutor)
  tokens: Token[];
}
