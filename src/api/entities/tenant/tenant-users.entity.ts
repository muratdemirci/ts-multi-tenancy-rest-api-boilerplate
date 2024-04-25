import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../user/user.entity';
import { Tenant } from '../tenant/tenant.entity';

@Entity('tenant_users')
export class TenantUser {
  @PrimaryColumn({ type: 'uuid' })
  users_id!: string;

  @PrimaryColumn({ type: 'uuid' })
  tenants_id!: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'users_id' })
  users!: Users;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenants_id' })
  tenant!: Tenant;
}
