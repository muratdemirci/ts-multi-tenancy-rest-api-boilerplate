import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Users } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';
import { UserRole } from './user-roles.entity';

@Entity('auth_roles')
export class AuthRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @OneToOne(() => Users, (user) => user.role)
  user: Users;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  users: UserRole[];
}
