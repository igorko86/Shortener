import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateDate } from '../common/CreateUpdateDate';
import { Student } from './Student';
import { Group } from './Group';

@Entity('student_group')
export class StudentGroup extends CreateUpdateDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.studentGroups, { onDelete: 'CASCADE' })
  student: Student;

  @ManyToOne(() => Group, (group) => group.studentGroups)
  group: Group;
}
