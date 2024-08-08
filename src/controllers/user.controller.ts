import {NextFunction, Request, Response, Router} from 'express';
import userService from '../services/user.service';
import projectService from '../services/project.service';
import {User} from '../entities/user';
import {UpsertUserDto} from '../dto/upsert-user.dto';

const usersController = Router();

usersController.get(``, (req: Request, res: Response, next: NextFunction) => getAllUsers(req, res).catch(next));
usersController.get(`/:id`, (req: Request, res: Response, next: NextFunction) => getUserById(req, res).catch(next));
usersController.get(`/:id/projects`, (req: Request<{id: string}, never, {id: number, name: string, description: string}[], {limit: string, offset: string}>, res: Response, next: NextFunction) => getProjectsForUser(req, res).catch(next));
usersController.post(``, (req: Request<never, never, UpsertUserDto>, res: Response, next: NextFunction) => createUser(req, res).catch(next));
usersController.post(`/:id/projects`, (req: Request<{id: string}, never, {projectIds: string[]}>, res: Response, next: NextFunction) => linkProjectsToUser(req, res).catch(next));
usersController.put(`/:id`, (req: Request<{id: string}, never, UpsertUserDto>, res: Response, next: NextFunction) => updateUser(req, res).catch(next));
usersController.delete(`/:id`, (req: Request<{id: string}>, res: Response, next: NextFunction) => deleteUser(req, res).catch(next));

async function getAllUsers(req: Request, res: Response<User[]>) {
    const users = await userService.findAll();
    res.json(users);
}

async function getUserById(req: Request, res: Response) {
    const user = await userService.findById(Number(req.params.id));
    res.json(user);
}

async function getProjectsForUser(req: Request<{id: string}, never, {id: number, name: string, description: string}[], {limit: string, offset: string}>, res: Response) {
    const limit: number | undefined = req.query.limit ? Number(req.query.limit) : undefined
    const offset: number | undefined = req.query.offset ? Number(req.query.offset) : undefined
    let projects = await projectService.findProjectsByUserId(Number(req.params.id), limit, offset);
    res.status(201).send(projects);
}

async function linkProjectsToUser(req: Request<{id: string}, never, {"projectIds": string[]}>, res: Response) {
    await projectService.linkProjectsToUser(Number(req.params.id), req.body.projectIds)
    res.status(201).end()
}

async function createUser(req: Request<never, never, UpsertUserDto>, res: Response) {
    const user = User.newUser(req.body)
    const newUser = await userService.create(user);
    res.status(201).json(newUser);
}

async function updateUser(req: Request<{id: string}, never, UpsertUserDto>, res: Response) {
    const updatedUser: User = await userService.update(Number(req.params.id), req.body);
    res.json(updatedUser);
}

async function deleteUser(req: Request<{id: string}>, res: Response): Promise<void> {
    await userService.delete(Number(req.params.id));
    res.status(204).end();
}
export { usersController }