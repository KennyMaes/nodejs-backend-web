import { pool } from '../config/database'
import { Project } from '../entities/Project';

export class ProjectRepository {
    async findAll(): Promise<Project[]> {
        const result = await pool.query('SELECT * FROM projects');
        return result.rows;
    }

    async findById(id: number): Promise<Project | null> {
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async getProjectsByUserId(userId: number): Promise<Project[]> {
        const result = await pool.query(
            `SELECT p.* FROM projects p
            JOIN user_projects up ON p.id = up.project_id
            WHERE up.user_id = $1`, [userId]
        );
        return result.rows
    }

    async create(project: Omit<Project, 'id'>): Promise<Project> {
        const { name, description } = project;
        const result = await pool.query(
            'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        return result.rows[0];
    }

    async update(id: number, project: Partial<Project>): Promise<Project | null> {
        const { name, description } = project;
        const result = await pool.query(
            'UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, id]
        );
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    }

    async linkProjectsToUser(userId: number, projectIds: string[]):Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            for (const prodId of projectIds) {
                await client.query(
                    'INSERT INTO user_projects (user_id, project_id) VALUES ($1, $2)',
                    [userId, prodId]
                );
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}