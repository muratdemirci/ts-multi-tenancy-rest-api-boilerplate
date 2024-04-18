import { globalTenantSettingsSeed } from '../seeds/global-tenant-settings.seed';
import { GlobalTenantSettings } from '../api/entities/settings/global-tenant-settings.entity';
import { AppDataSource } from '../configs/database.config';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedGlobalTenantSettingsTable1711923519354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.manager.getRepository(GlobalTenantSettings).save(globalTenantSettingsSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
