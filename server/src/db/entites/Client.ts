import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Person } from '../common/Persone';
import { Trans } from './Trans';

@Entity('client')
export class Client extends Person {
  @Column({
    type: 'numeric',
  })
  balance: number;

  @Column({
    default: true,
    name: 'active',
  })
  is_active: boolean;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  additional_info: {
    age: 'number';
    hair_color: string;
  };

  @OneToMany(() => Trans, (transactions) => transactions.client)
  transactions: Trans[];
}
