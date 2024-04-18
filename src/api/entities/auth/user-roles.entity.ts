import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../user/user.entity';
import { AuthRole } from './auth-roles.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('user_roles')
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.roles)
  user: Users;

  @ManyToOne(() => AuthRole, (role) => role.users)
  role: AuthRole;
}
