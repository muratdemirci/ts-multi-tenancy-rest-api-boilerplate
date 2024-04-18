import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthRolesTable1710909199412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_roles',
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
            length: '100',
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('auth_roles');
    if (tableExists) {
      await queryRunner.dropTable('auth_roles');
    } else {
      console.log('Table auth_roles does not exist. Skipping drop operation.');
    }
  }
}
