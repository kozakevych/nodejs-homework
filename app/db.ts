import { Pool } from 'pg';

const dbConfig = {
  user: 'your_database_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
};

const pool = new Pool(dbConfig);

export default pool;
