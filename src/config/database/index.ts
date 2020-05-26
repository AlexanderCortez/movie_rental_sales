import { IDatabaseConfig } from "./interfaces/database.interface";
import { databaseConfig } from './database-environments';

export const getDatabaseConfig = (): IDatabaseConfig => {
  const { NODE_ENV } = process.env;
  const config = databaseConfig[NODE_ENV] || databaseConfig['development'];
  return config;
}