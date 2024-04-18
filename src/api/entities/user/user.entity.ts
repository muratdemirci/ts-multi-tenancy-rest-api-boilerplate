import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

// Entities
import { BaseEntity } from '../base/base.entity';
import { Tenant } from '../tenant/tenant.entity';
import { AuthRole } from '../auth/auth-roles.entity';
import { UserRole } from '../auth/user-roles.entity';

@Entity('users', { orderBy: { createdAt: 'DESC' } })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ length: 100, nullable: false, select: false })
  password: string;

  @Column({ length: 255, nullable: false })
  firstName: string;

  @Column({ length: 255, nullable: false })
  lastName: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToOne(() => AuthRole)
  @JoinColumn()
  role: AuthRole;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];

  @Column({ nullable: true })
  roleId: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  timezone: string;

  @ManyToMany(() => Tenant, (tenant) => tenant.users)
  @JoinTable({
    name: 'tenant_users',
    joinColumn: { name: 'users_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tenants_id', referencedColumnName: 'id' },
  })
  tenants: Tenant[];

  toJSON() {
    delete this.isDeleted;
    return this;
  }
}
