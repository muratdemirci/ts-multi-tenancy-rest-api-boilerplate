import dotenv from 'dotenv';
import 'reflect-metadata';
import logger from './configs/logger.config';
import app from './configs/express.config';
import { AppDataSource } from './configs/database.config';
import * as grpc from './grpc';

dotenv.config();
const PORT = process.env.PORT || 5000;

const connect = async () => {
  grpc.init().catch(console.error);
  await AppDataSource.initialize()
    .then(() => {
      logger.info('Connect to database successfully');
      app.listen(Number(PORT), '0.0.0.0', () => {
        logger.info(`Server running at ${PORT}`);
      });
    })
    .catch((e) => {
      logger.info(`The connection to database was failed with error: ${e}`);
      process.exit(1);
    });

  await AppDataSource.synchronize();
};

connect();
