import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('auth_permissions')
export class AuthPermission extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  permission!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string;

  @Column({ default: false })
  isDeleted?: boolean;

  toJSON() {
    delete this.isDeleted;
    return this;
  }
}
