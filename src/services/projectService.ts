import {BadRequestError} from '../util/exceptions';
import {Project} from '../entities/Project';
import {ProjectRepository} from '../repositories/projectRepository';

export class ProjectService {
    private projectRepository = new ProjectRepository();

    async findAll(): Promise<Project[]> {
        return this.projectRepository.findAll();
    }

    async findById(id: number): Promise<Project | null> {
        return this.projectRepository.findById(id);
    }

    async findProjectsByUserId(userId: number, limit?: number): Promise<Project[]> {
        return this.projectRepository.getProjectsByUserId(userId, limit);
    }

    async linkProjectsToUser(id: number, projectIds: string[]): Promise<void> {
        return this.projectRepository.linkProjectsToUser(id, projectIds);
    }

    async create(project: Omit<Project, 'id'>): Promise<Project> {
        if (!project.name || !project.description) {
            throw new BadRequestError('Name and description are required')
        }
        return this.projectRepository.create(project);
    }

    async update(id: number, project: Partial<Project>): Promise<Project | null> {
        return this.projectRepository.update(id, project);
    }

    async delete(id: number): Promise<void> {
        return this.projectRepository.delete(id);
    }
}