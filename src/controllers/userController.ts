import {Application, NextFunction, Request, Response} from 'express';
import userService from '../services/userService';
import projectService from '../services/projectService';


export class UserController {
    readonly basePath: string = '/users'

    static register(app: Application): void {
            new UserController(app);
    }

    constructor(app: Application) {
        app.get(`${this.basePath}/`, (req: Request, res: Response, next: NextFunction) => this.getAllUsers(req, res).catch(next));
        app.get(`${this.basePath}/:id`, (req: Request, res: Response, next: NextFunction) => this.getUserById(req, res).catch(next));
        app.get(`${this.basePath}/:id/projects`, (req: Request<{id: string}, never, {id: number, name: string, description: string}[], {limit: string, offset: string}>, res: Response, next: NextFunction) => this.getProjectsForUser(req, res).catch(next));
        app.post(`${this.basePath}/`, (req: Request<never, never, { name: string, email: string}>, res: Response, next: NextFunction) => this.createUser(req, res).catch(next));
        app.post(`${this.basePath}/:id/projects`, (req: Request<{id: string}, never, {projectIds: string[]}>, res: Response, next: NextFunction) => this.linkProjectsToUser(req, res).catch(next));
        app.put(`${this.basePath}/:id`, (req: Request<{id: string}, never, { name: string, email: string}>, res: Response, next: NextFunction) => this.updateUser(req, res).catch(next));
        app.delete(`${this.basePath}/:id`, (req: Request<{id: string}>, res: Response, next: NextFunction) => this.deleteUser(req, res).catch(next));
    }
    async getAllUsers(req: Request, res: Response) {
        const users = await userService.findAll();
        res.json(users);
    }

    async getUserById(req: Request, res: Response) {
        const user = await userService.findById(Number(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    async getProjectsForUser(req: Request<{id: string}, never, {id: number, name: string, description: string}[], {limit: string, offset: string}>, res: Response) {
        const limit: number | undefined = req.query.limit ? Number(req.query.limit) : undefined
        const offset: number | undefined = req.query.offset ? Number(req.query.offset) : undefined
        let projects = await projectService.findProjectsByUserId(Number(req.params.id), limit, offset);
        res.status(201).send(projects);
    }

    async linkProjectsToUser(req: Request<{id: string}, never, {"projectIds": string[]}>, res: Response) {
        await projectService.linkProjectsToUser(Number(req.params.id), req.body.projectIds)
        res.status(201).end()
    }

    async createUser(req: Request<never, never, {name: string, email: string}>, res: Response) {
        const newUser = await userService.create(req.body);
        res.status(201).json(newUser);
    }

    async updateUser(req: Request<{id: string}, never, {name: string, email: string}>, res: Response) {
        const updatedUser = await userService.update(Number(req.params.id), req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    }

    async deleteUser(req: Request<{id: string}>, res: Response) {
        await userService.delete(Number(req.params.id));
        res.status(204).end();
    }
}