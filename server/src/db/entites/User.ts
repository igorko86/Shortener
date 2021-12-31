import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Role } from '../../services/interfaces';
import { Student } from './Student';

@Entity('user')
export class User extends CreateUpdateDate {
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
    default: Role.Viewer,
  })
  role: Role;

  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @Column({ default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column({ type: 'timestamptz', onUpdate: 'NOW()', nullable: true, name: 'allow_to' })
  allowTo: Date;

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];
}
