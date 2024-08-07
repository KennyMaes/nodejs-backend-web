import {NotFoundError} from '../util/exceptions';
import {Project} from '../entities/project';
import repository from '../repositories/project.repository';

export class ProjectService {

    async findAll(): Promise<Project[]> {
        return repository.findAll();
    }

    async findById(id: number): Promise<Project> {
        const project = await repository.findById(id);
        if (project) {
            return project;
        }
        throw new NotFoundError(`No project found for id: ${id}`)
    }

    async findProjectsByName(nameSearch: string): Promise<Project[]> {
        return repository.findByProductName(nameSearch)
    }

    async findProjectsByUserId(userId: number, limit?: number, offset?: number): Promise<Project[]> {
        return repository.getProjectsByUserId(userId, limit, offset);
    }

    async linkProjectsToUser(id: number, projectIds: string[]): Promise<void> {
        return repository.linkProjectsToUser(id, projectIds);
    }

    async create(project: Omit<Project, 'id'>): Promise<Project> {
        return repository.create(project);
    }

    async update(id: number, project: Partial<Project>): Promise<Project | null> {
        return repository.update(id, project);
    }

    async delete(id: number): Promise<void> {
        return repository.delete(id);
    }
}

export default new ProjectService();