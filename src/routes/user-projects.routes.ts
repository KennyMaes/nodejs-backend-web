import {NextFunction, Request, Response, Router} from 'express';
import {UpsertProjectDto} from '../dto/upsert-project.dto';
import { projectsController } from '../controllers/project.controller';
import {userProjectsController} from '../controllers/user-projects.controller.ts';

const userProjectsRoutes = Router()

userProjectsRoutes.get(`/:userId/projects`, (req: Request<{userId: string}, never, {id: number, name: string, description: string}[], {limit: string, offset: string}>, res: Response, next: NextFunction) => userProjectsController.getProjectsForUser(req, res).catch(next));
userProjectsRoutes.post(`/:userId/projects`, (req: Request<{userId: string}, never, {projectIds: string[]}>, res: Response, next: NextFunction) => userProjectsController.linkProjectsToUser(req, res).catch(next));

export { userProjectsRoutes }