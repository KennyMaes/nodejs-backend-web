import { pool } from '../config/database'
import { User } from '../entities/User';

export class UserRepository {
    async findAll(): Promise<User[]> {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

    async findById(id: number): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        const { name, email } = user;
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        return result.rows[0];
    }

    async update(id: number, user: Partial<User>): Promise<User | null> {
        const { name, email } = user;
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    }
}