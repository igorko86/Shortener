import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Group } from './Group';
import { Student } from './Student';
import { User } from './User';
import { Exercise } from './Exercise';

@Entity('tutor')
export class Tutor extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column({ type: 'timestamptz', onUpdate: 'NOW()', nullable: true, name: 'allow_to' })
  allowTo: Date;

  @OneToMany(() => Group, (group) => group.tutor)
  groups: Group[];

  @OneToMany(() => Student, (student) => student.tutor)
  students: Student[];

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Exercise, (exercise) => exercise.tutor)
  exercises: Exercise[];
}
