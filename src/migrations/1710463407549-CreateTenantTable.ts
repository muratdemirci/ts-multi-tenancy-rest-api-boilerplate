import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantTable1710463407549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('tenants');
    if (tableExists) {
      console.log('Table tenants already exists. Skipping creation.');
    } else {
      console.log('Table tenants does not exist. Creating Users table');

      await queryRunner.createTable(
        new Table({
          name: 'tenants',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'status',
              type: 'enum',
              enum: ['active', 'inactive', 'pending', 'suspended'],
              default: `'pending'`,
            },
            {
              name: 'domains',
              type: 'text',
              isArray: true,
            },
            {
              name: 'isDeleted',
              type: 'boolean',
              default: false,
            },
          ],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('tenants');
    if (tableExists) {
      await queryRunner.dropTable('tenants');
    } else {
      console.log('Table tenants does not exist. Skipping drop operation.');
    }
  }
}
