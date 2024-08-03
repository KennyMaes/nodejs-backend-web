import {BadRequestError} from '../util/exceptions';
import {Project} from '../entities/Project';
import {ProjectRepository} from '../repositories/projectRepository';

export class ProjectService {
    private productReposititory = new ProjectRepository();

    async findAll(): Promise<Project[]> {
        return this.productReposititory.findAll();
    }

    async findById(id: number): Promise<Project | null> {
        return this.productReposititory.findById(id);
    }

    async create(product: Omit<Project, 'id'>): Promise<Project> {
        if (!product.name || !product.description) {
            throw new BadRequestError('Name and description are required')
        }
        return this.productReposititory.create(product);
    }

    async update(id: number, product: Partial<Project>): Promise<Project | null> {
        return this.productReposititory.update(id, product);
    }

    async delete(id: number): Promise<void> {
        return this.productReposititory.delete(id);
    }
}