// inspired from https://dkzeb.medium.com/unit-testing-in-ts-jest-with-typeorm-entities-ad5de5f95438

import { DataSource } from 'typeorm';

import { checkEntitiesExist } from '../../utilities/entity.utility';

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;

  getRepo(entity: string) {
    return this.dbConnect.getRepository(entity);
  }

  async setupTestDB() {
    // Check if entity files exist
    if (!checkEntitiesExist()) {
      console.error('Cannot initialize database: one or more entity files do not exist');
      return;
    }

    const migrationPaths: string[] = process.env.TYPEORM_USE_CLI === 'true' ? ['src/migrations/*{.ts,.js}'] : [];

    this.dbConnect = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: migrationPaths,
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
      logging: process.env.NODE_ENV === 'development' ? true : false,
    });

    try {
      await this.dbConnect.initialize();
      console.log('TEST Database successfully initialized');
    } catch (error) {
      console.error('Error initializing TEST database:', JSON.stringify(error));
    }
  }

  teardownTestDB() {
    if (this.dbConnect.isInitialized) this.dbConnect.destroy();
  }
}
