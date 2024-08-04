import {Application, NextFunction, Request, Response} from 'express';
import service from '../services/projectService';
import {BadRequestError} from '../util/exceptions';
import {UpsertProjectDto} from '../dto/upsertProjectDto';
import {Project} from '../entities/Project';

export class ProjectController {
    readonly basePath: string = '/projects';

    static register(app: Application): void {
        new ProjectController(app);
    }

    constructor(app: Application) {
        app.get(`${this.basePath}/`, (req: Request, res: Response, next: NextFunction) => this.getAllProjects(req, res).catch(next));
        app.get(`${this.basePath}/search`, (req: Request<never, never, never, { nameSearch: string }>, res: Response, next: NextFunction) => this.getProjectsByNameSeach(req, res).catch(next));
        app.get(`${this.basePath}/:id`, (req: Request<{ id: string }>, res: Response, next: NextFunction) => this.getProjectById(req, res).catch(next));
        app.post(`${this.basePath}/`, (req: Request<never, never, UpsertProjectDto>, res: Response, next: NextFunction) => this.createProject(req, res).catch(next));
        app.put(`${this.basePath}/:id`, (req: Request<{ id: string }, never, UpsertProjectDto>, res: Response, next: NextFunction) => this.updateProject(req, res).catch(next));
        app.delete(`${this.basePath}/:id`, (req: Request<{ id: string }>, res: Response, next: NextFunction) => this.deleteProject(req, res).catch(next));
    }

    async getAllProjects(req: Request, res: Response) {
        const projects: Project[] = await service.findAll();
        res.json(projects);
    }

    async getProjectById(req: Request<{ id: string }>, res: Response) {
        const id = Number(req.params.id);
        const project: Project = await service.findById(id);
        res.status(201).send(project);
    }


    async getProjectsByNameSeach(req: Request<never, never, never, { nameSearch: string }>, res: Response) {
        const nameSearch: string = req.query.nameSearch;
        this.validateNameSearch(nameSearch);
        const projects = await service.findProjectsByName(req.query.nameSearch);
        res.status(201).send(projects);
    }

    async createProject(req: Request<never, never, UpsertProjectDto>, res: Response) {
        const project = Project.newProject(req.body);
        const newProject = await service.create(project);
        res.json(newProject);
    }

    async updateProject(req: Request<{ id: string }, never, UpsertProjectDto>, res: Response) {
        const id = Number(req.params.id);
        const project: Project = Project.newProject(req.body);
        const updatedProject = await service.update(id, project);
        res.json(updatedProject);
    }

    async deleteProject(req: Request<{ id: string }>, res: Response) {
        await service.delete(Number(req.params.id));
        res.status(204).end();
    }

    private validateNameSearch = (nameSearch: string) => {
        if (!nameSearch || nameSearch.trim() === '') {
            throw new BadRequestError('Please provide a nameSearch');
        }
        const regex = /^[a-zA-Z0-9 ]+$/;
        if (!regex.test(nameSearch)) {
            throw new BadRequestError('nameSearch contains invalid characters');
        }
    }
}
