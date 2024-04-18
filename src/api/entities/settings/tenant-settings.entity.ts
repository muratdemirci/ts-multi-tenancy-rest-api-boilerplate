import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';
import { BaseEntity } from '../base/base.entity';
import { Field } from '../../interfaces/setting/tenant-settings.interface';

@Entity('tenant_settings')
export class TenantSettings extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'json', nullable: true })
  fields: Field[];

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  tenantId: string;

  @OneToOne(() => Tenant, (tenant) => tenant.tenantSettings)
  tenant: Tenant;

  toJSON() {
    delete this.isDeleted;
    return this;
  }
}
