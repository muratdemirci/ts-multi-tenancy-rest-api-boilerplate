import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGlobalTenantSettingsTable1711922915336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'global_tenant_settings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'fields',
            type: 'json',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('global_tenant_settings');
    if (tableExists) {
      await queryRunner.dropTable('global_tenant_settings');
    } else {
      console.log('Table global_tenant_settings does not exist. Skipping drop operation.');
    }
  }
}
