import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Client } from './Client';

enum TransactionTypes {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}

@Entity('trans')
export class Trans extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionTypes,
  })
  type: string;

  @Column({
    type: 'numeric',
  })
  amount: number;

  @ManyToOne(() => Client, (client) => client.transactions)
  @JoinColumn({
    name: 'client_id',
  })
  client: Client;
}
