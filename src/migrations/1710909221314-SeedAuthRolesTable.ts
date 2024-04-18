import { authRolesSeed } from '../seeds/auth-roles.seed';
import { AuthRole } from '../api/entities/auth/auth-roles.entity';
import { AppDataSource } from '../configs/database.config';
import { MigrationInterface, QueryRunner } from 'typeorm';

import authService from '../api/services/auth/auth.service';
import constants from '../constants';
import { userSeed } from '../seeds/user.seed';

export class SeedAuthRolesTable1710909221314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.manager.getRepository(AuthRole).save(authRolesSeed);

    // Create first default superadmin role
    const superAdminRole = authRolesSeed.find((role) => role.name === constants.ROLES.SUPERADMIN);
    const superAdminRoleId = superAdminRole ? superAdminRole.id : null;

    const superAdminUser = userSeed.find((user) => user.email === 'superadmin@deusmur.com');
    const superAdminUserId = superAdminUser ? superAdminUser.id : null;

    await authService.assignRole({
      userId: superAdminUserId,
      roleId: superAdminRoleId,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
