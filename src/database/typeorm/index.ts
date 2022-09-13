import 'dotenv/config';
import path from 'path';
import { DataSource } from 'typeorm';

const connection = new DataSource({
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [path.resolve(__dirname,'..', '..', 'modules', '**' ,'entities', '**.js')],
  synchronize: false,
});

connection.initialize();

export { connection };
