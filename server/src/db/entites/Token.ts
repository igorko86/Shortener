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
import { Trans } from './Trans';
import { Company } from './Company';

@Entity('token')
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'refresh_token',
  })
  refreshToken: string;

  @Column({
    name: 'company_id',
  })
  companyId: string;

  @ManyToOne(() => Company, (company) => company.tokens)
  @JoinColumn({
    name: 'company_id',
  })
  company: Company;
}
