import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
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

    async createUser(req: Request, res: Response) {
        const newUser = await userService.create(req.body);
        res.status(201).json(newUser);
    }

    async updateUser(req: Request, res: Response) {
        const updatedUser = await userService.update(Number(req.params.id), req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    }

    async deleteUser(req: Request, res: Response) {
        await userService.delete(Number(req.params.id));
        res.status(204).end();
    }
}