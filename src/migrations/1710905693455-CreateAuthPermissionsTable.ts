import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthPermissionsTable1710905693455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_permissions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'route',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('auth_permissions');
    if (tableExists) {
      await queryRunner.dropTable('auth_permissions');
    } else {
      console.log('Table auth_permissions does not exist. Skipping drop operation.');
    }
  }
}
