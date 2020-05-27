import { IDatabaseConfig } from './interfaces/database.interface';

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

export const databaseConfig: { [environment: string]: IDatabaseConfig } = {
  development: {
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT || 5432,
    username: DATABASE_USERNAME,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    entities: ['dist/src/**/*.entity{.ts,.js}'],
    seeds: ['src/seeds/**/*{.ts,.js}'],
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations'
    }
  },
  test: {
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT || 5434,
    username: DATABASE_USERNAME,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    entities: ['src/**/*.entity{.ts,.js}'],
  },
}