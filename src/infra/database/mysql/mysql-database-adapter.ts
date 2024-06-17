import { createPool, Pool } from 'mysql2/promise';
import 'dotenv/config';

export class MySqlDatabaseAdapter {

    protected pool: Pool;

    constructor() {
        this.pool = createPool({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
}

 