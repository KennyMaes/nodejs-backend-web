import {BadRequestError} from '../util/exceptions';
import {Project} from '../entities/Project';
import {ProjectRepository} from '../repositories/projectRepository';
2
export class ProjectService {
    private projectRepository = new ProjectRepository();

    async findAll(): Promise<Project[]> {
        return this.projectRepository.findAll();
    }

    async findById(id: number): Promise<Project | null> {
        return this.projectRepository.findById(id);
    }

    async findProjectsByUserId(userId: number): Promise<Project[]> {
        return this.projectRepository.getProjectsByUserId(userId);
    }

    async linkProjectsToUser(id: number, projectIds: string[]): Promise<void> {
        console.debug("UserService: LinkProjects")
        return this.projectRepository.linkProjectsToUser(id, projectIds);
    }

    async create(product: Omit<Project, 'id'>): Promise<Project> {
        if (!product.name || !product.description) {
            throw new BadRequestError('Name and description are required')
        }
        return this.projectRepository.create(product);
    }

    async update(id: number, product: Partial<Project>): Promise<Project | null> {
        return this.projectRepository.update(id, product);
    }

    async delete(id: number): Promise<void> {
        return this.projectRepository.delete(id);
    }
}