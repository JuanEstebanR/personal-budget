import pkg from 'pg';
const { Pool } = pkg;
import { config } from './config.js';
export const pool = new Pool(config.db);
export async function query(query, params) {
    const { rows, fields } = await pool.query(query, params);
    return rows;
}
