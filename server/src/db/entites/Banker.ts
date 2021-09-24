import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Person } from '../common/Persone';

@Entity('banker')
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10,
  })
  employee_number: string;

  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;
}
