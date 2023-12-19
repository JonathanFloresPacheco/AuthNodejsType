import pgPromise from 'pg-promise';
import * as dotenv from 'dotenv';

const pgp = pgPromise();

dotenv.config();

const db = pgp({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_DATABASE
});

export default db;