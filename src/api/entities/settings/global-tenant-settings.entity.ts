import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Field } from '../../interfaces/setting/tenant-settings.interface';

@Entity('global_tenant_settings')
export class GlobalTenantSettings extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'json', nullable: true })
  fields: Field[];

  @Column({ default: false })
  isDeleted: boolean;

  toJSON() {
    delete this.isDeleted;
    return this;
  }
}
