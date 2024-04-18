import { MigrationInterface, QueryRunner } from 'typeorm';
import { Tenant } from '../api/entities/tenant/tenant.entity';
import { tenantSeed } from '../seeds/tenant.seed';
import { AppDataSource } from '../configs/database.config';

export class SeedTenantTable1710466156590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.manager.getRepository(Tenant).save(tenantSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
