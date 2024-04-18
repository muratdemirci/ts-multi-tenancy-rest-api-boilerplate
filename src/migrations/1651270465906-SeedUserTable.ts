import { MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from '../api/entities/user/user.entity';
import { userSeed } from '../seeds/user.seed';
import { AppDataSource } from '../configs/database.config';

export class SeedUserTable1651270465906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.manager.getRepository(Users).save(userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
