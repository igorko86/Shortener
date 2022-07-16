import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUpdateDate extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
