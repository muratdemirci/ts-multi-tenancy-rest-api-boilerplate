import { tenantSettingsSeed } from '../seeds/tenant-settings.seed';
import { TenantSettings } from '../api/entities/settings/tenant-settings.entity';
import { AppDataSource } from '../configs/database.config';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTenantSettingsTable1711947465010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.manager.getRepository(TenantSettings).save(tenantSettingsSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
