import {NextFunction, Request, Response, Router} from 'express';
import {UpsertUserDto} from '../dto/upsert-user.dto';
import {usersController} from '../controllers/user.controller';

const userRoutes =  Router();

userRoutes.get(``, (req: Request, res: Response, next: NextFunction) => usersController.getAllUsers(req, res).catch(next));
userRoutes.get(`/:id`, (req: Request, res: Response, next: NextFunction) => usersController.getUserById(req, res).catch(next));
userRoutes.post(``, (req: Request<never, never, UpsertUserDto>, res: Response, next: NextFunction) => usersController.createUser(req, res).catch(next));
userRoutes.put(`/:id`, (req: Request<{id: string}, never, UpsertUserDto>, res: Response, next: NextFunction) => usersController.updateUser(req, res).catch(next));
userRoutes.delete(`/:id`, (req: Request<{id: string}>, res: Response, next: NextFunction) => usersController.deleteUser(req, res).catch(next));

export { userRoutes }