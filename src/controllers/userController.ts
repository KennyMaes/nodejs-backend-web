import {Application, NextFunction, Request, Response} from 'express';
import {UserService} from '../services/userService';

const userService = new UserService();

export class UserController {
    readonly basePath: string = '/users'

    static register(app: Application): void {
            new UserController(app);
    }

    constructor(app: Application) {
        app.get(`${this.basePath}/`, (req: Request, res: Response, next: NextFunction) => this.getAllUsers(req, res).catch(next));
        app.get(`${this.basePath}/:id`, (req: Request, res: Response, next: NextFunction) => this.getUserById(req, res).catch(next));
        app.post(`${this.basePath}/`, (req: Request<never, never, { name: string, email: string}>, res: Response, next: NextFunction) => this.createUser(req, res).catch(next));
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