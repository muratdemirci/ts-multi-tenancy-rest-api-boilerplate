import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const migrationPaths: string[] =
  process.env.TYPEORM_USE_CLI === 'true'
    ? ['src/migrations/*{.ts,.js}']
    : [];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sso',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: migrationPaths,
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  logging: process.env.NODE_ENV === 'development' ? true : false,
  ssl: {
    rejectUnauthorized: false,
  },
});
