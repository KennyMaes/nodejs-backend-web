import {Application, NextFunction, Request, Response} from 'express';
import service from '../services/projectService';
import {NotFoundError} from '../util/exceptions';

export class ProjectController {
    readonly basePath: string = '/projects'

    static register(app: Application): void {
            new ProjectController(app);
    }

    constructor(app: Application) {
        app.get(`${this.basePath}/`, (req: Request, res: Response, next: NextFunction) => this.getAllProjects(req, res).catch(next));
        app.get(`${this.basePath}/search`, (req: Request<never, never, never, {nameSearch: string}>, res: Response, next: NextFunction) => this.getProjectsByNameSeach(req, res).catch(next));
        app.get(`${this.basePath}/:id`, (req: Request<{id: string}>, res: Response, next: NextFunction) => this.getProjectById(req, res).catch(next));
        app.post(`${this.basePath}/`, (req: Request<never, never, { name: string, description: string}>, res: Response, next: NextFunction) => this.createProject(req, res).catch(next));
        app.put(`${this.basePath}/:id`, (req: Request<{id: string}, never, { name: string, description: string}>, res: Response, next: NextFunction) => this.updateProject(req, res).catch(next));
        app.delete(`${this.basePath}/:id`, (req: Request<{id: string}>, res: Response, next: NextFunction) => this.deleteProject(req, res).catch(next));
    }
    async getAllProjects(req: Request, res: Response) {
        const projects = await service.findAll();
        res.json(projects);
    }

    async getProjectById(req: Request<{id: string}>, res: Response) {
        const id = Number(req.params.id);
        const project = await service.findById(id);
        if (project) {
            res.json(project);
        }else {
            throw new NotFoundError(`No project found for id: ${id}`)
        }
    }


    // TODO: Replace {} with upsert dto object
    async createProject(req: Request<never, never, {name: string, description: string}>, res: Response) {
        const project = await service.create(req.body);
        res.json(project);
    }

    async updateProject(req: Request<{id: string}, never, {name: string, description: string}>, res: Response) {
        const id = Number(req.params.id);
        const project = await service.update(id, req.body);
        res.json(project);
    }

    async deleteProject(req: Request<{id: string}>, res: Response) {
        await service.delete(Number(req.params.id));
        res.status(204).end();
    }

    async getProjectsByNameSeach(req: Request<never, never, never, { nameSearch: string }>, res: Response) {
        const projects = await service.findProjectsByName(req.query.nameSearch)
        res.status(201).send(projects)
    }
}