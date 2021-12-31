import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Group } from './Group';
import { Role } from '../../services/interfaces';
import { Student } from './Student';

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

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Tutor,
  })
  role: Role;

  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @Column({ default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column({ type: 'timestamptz', onUpdate: 'NOW()', nullable: true, name: 'allow_to' })
  allowTo: Date;

  @OneToMany(() => Group, (group) => group.tutor)
  groups: Group[];

  @OneToMany(() => Student, (student) => student.tutor)
  students: Student[];
}
