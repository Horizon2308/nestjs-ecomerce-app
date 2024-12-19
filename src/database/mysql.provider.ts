import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  database: 'shopapp',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/*-migration{.ts,.js}'],
  synchronize: false,
  logging: true,
  maxQueryExecutionTime: 500,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
