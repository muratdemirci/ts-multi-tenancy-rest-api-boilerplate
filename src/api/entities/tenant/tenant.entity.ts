import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Users } from '../user/user.entity';
import { TenantSettings } from '../settings/tenant-settings.entity';

@Entity('tenants', { orderBy: { createdAt: 'DESC' } })
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'pending',
  })
  status: string;

  @Column('text', { array: true })
  domains: string[];

  @Column({ default: false })
  isDeleted: boolean;

  @OneToOne(() => TenantSettings, (tenantSettings) => tenantSettings.tenant, { cascade: true, eager: true })
  @JoinColumn()
  tenantSettings: TenantSettings;

  @ManyToMany(() => Users, (user) => user.tenants)
  users: Users[];

  toJSON() {
    delete this.isDeleted;
    return this;
  }
}
