import { AppDataSource } from '../configs/database.config';
import { TenantUser } from '../api/entities/tenant/tenant-users.entity';
import { tenantUsersSeed } from '../seeds/tenant-users.seed';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTenantUsersTable1712064371636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.manager.getRepository(TenantUser).save(tenantUsersSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
