import {BadRequestError} from '../util/exceptions';
import {Project} from '../entities/Project';
import repository from '../repositories/projectRepository';

export class ProjectService {

    async findAll(): Promise<Project[]> {
        return repository.findAll();
    }

    async findById(id: number): Promise<Project | null> {
        return repository.findById(id);
    }

    async findProjectsByName(nameSearch: string): Promise<Project[]> {
        if (nameSearch && nameSearch.trim() !== '') {
            return repository.findByProductName(nameSearch)
        } else {
            throw new BadRequestError("There should be at least a name search value")
        }

    }

    async findProjectsByUserId(userId: number, limit?: number, offset?: number): Promise<Project[]> {
        return repository.getProjectsByUserId(userId, limit, offset);
    }

    async linkProjectsToUser(id: number, projectIds: string[]): Promise<void> {
        return repository.linkProjectsToUser(id, projectIds);
    }

    async create(project: Omit<Project, 'id'>): Promise<Project> {
        if (!project.name || !project.description) {
            throw new BadRequestError('Name and description are required')
        }
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