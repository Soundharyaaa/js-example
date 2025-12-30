import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'Soundharya',
  host: 'localhost',
  port: 5432,
  database: 'Todo',
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 10000,
  options: '-c statement_timeout=3000'
});

export default pool;
