import pool from '../config/db';
import { User } from '../types/userType';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class UserRepository {
    static async findByUsername(username: string): Promise<User | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length ? (rows[0] as User) : null;
    }

    static async create(user: User): Promise<number> {
        const { username, password } = user;
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        return result.insertId;
    }
}
