import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token')
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'refresh_token',
  })
  refreshToken: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;
}
