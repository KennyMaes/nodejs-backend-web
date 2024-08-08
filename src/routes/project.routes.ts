import {NextFunction, Request, Response, Router} from 'express';
import {UpsertProjectDto} from '../dto/upsert-project.dto';
import { projectsController } from '../controllers/project.controller';

const projectRoutes = Router()

projectRoutes.get(``, (req: Request, res: Response, next: NextFunction) => projectsController.getAllProjects(req, res).catch(next));
projectRoutes.get(`/search`, (req: Request<never, never, never, { nameSearch: string }>, res: Response, next: NextFunction) => projectsController.getProjectsByNameSeach(req, res).catch(next));
projectRoutes.get(`/:id`, (req: Request<{ id: string }>, res: Response, next: NextFunction) => projectsController.getProjectById(req, res).catch(next));
projectRoutes.post(``, (req: Request<never, never, UpsertProjectDto>, res: Response, next: NextFunction) => projectsController.createProject(req, res).catch(next));
projectRoutes.put(`/:id`, (req: Request<{ id: string }, never, UpsertProjectDto>, res: Response, next: NextFunction) => projectsController.updateProject(req, res).catch(next));
projectRoutes.delete(`/:id`, (req: Request<{ id: string }>, res: Response, next: NextFunction) => projectsController.deleteProject(req, res).catch(next));

export { projectRoutes }