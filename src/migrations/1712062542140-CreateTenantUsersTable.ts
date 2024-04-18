import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateTenantUsersTable1712062542140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tenant_users',
        columns: [
          {
            name: 'users_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'tenants_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    // await queryRunner.createForeignKey(
    //   'tenant_users',
    //   new TableForeignKey({
    //     columnNames: ['users_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'users',
    //     onDelete: 'CASCADE',
    //   }),
    // );

    // await queryRunner.createForeignKey(
    //   'tenant_users',
    //   new TableForeignKey({
    //     columnNames: ['tenants_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'tenants',
    //   }),
    // );

    // await queryRunner.createIndex(
    //   'tenant_users',
    //   new TableIndex({
    //     columnNames: ['users_id'],
    //   }),
    // );

    // await queryRunner.createIndex(
    //   'tenant_users',
    //   new TableIndex({
    //     columnNames: ['tenants_id'],
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
