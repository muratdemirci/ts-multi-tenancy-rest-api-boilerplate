import { MigrationInterface, QueryRunner } from 'typeorm';
import { AppDataSource } from '../configs/database.config';
import { AuthPermission } from '../api/entities/auth/auth-permissions.entity';
import { authPermissionSeed } from '../seeds/auth-permissions.seed';

export class SeedAuthPermissionsTable1710906032550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.manager.getRepository(AuthPermission).save(authPermissionSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
