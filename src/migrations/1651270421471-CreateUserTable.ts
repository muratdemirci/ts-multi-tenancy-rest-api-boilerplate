import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1651270421471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('users');
    if (tableExists) {
      console.log('Table users already exists. Skipping creation.');
    } else {
      console.log('Table users does not exist. Creating Users table');

      await queryRunner.createTable(
        new Table({
          name: 'users',
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
            },
            {
              name: 'email',
              type: 'varchar',
              length: '100',
              isNullable: false,
            },
            {
              name: 'password',
              type: 'varchar',
              length: '100',
              isNullable: false,
            },
            {
              name: 'firstName',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'lastName',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'phone',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'address',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'timezone',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'isDeleted',
              type: 'smallint',
              default: '0',
            },
          ],
          uniques: [
            {
              columnNames: ['email'],
            },
          ],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('users');
    if (tableExists) {
      await queryRunner.dropTable('users');
    } else {
      console.log('Table users does not exist. Skipping drop operation.');
    }
  }
}
