import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const EnvironmentVariables = z.object({
  NODE_ENV: z.string().optional(),
  DB_HOST: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().optional(),
  DB_PORT: z.string().optional(),
  PORT: z.string().optional(),
  TOKEN_SECRET_KEY: z.string().optional(),
  TYPEORM_USE_CLI: z.boolean().optional(),
  FRONTEND_BASE_URL: z.string().optional(),
  PROTOS: z.string().optional(),
  API_PREFIX: z.string().optional(),
});

export const validateEnvironmentVariables = () => {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    DB_HOST: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    DB_USER: process.env.DB_USER ? process.env.DB_USER : 'root',
    DB_PASSWORD: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'root',
    DB_NAME: process.env.DB_NAME ? process.env.DB_NAME : 'test',
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY ? process.env.TOKEN_SECRET : 'followme',
    TYPEORM_USE_CLI: process.env.TYPEORM_USE_CLI ? process.env.TYPEORM_USE_CLI : false,
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL ? process.env.FRONTEND_BASE_URL : 'http://localhost:3000',
    PROTOS: process.env.PROTOS ? process.env.PROTOS : 'https://github.com/protoServerRepoUrl',
    API_PREFIX: process.env.API_PREFIX ? process.env.API_PREFIX : '/api',
  };

  const result: any = EnvironmentVariables.parse(envVars);

  if (!('success' in result) || !result.success) {
    throw new Error(`Environment variables validation failed: ${JSON.stringify(result.error)}`);
  }
};
