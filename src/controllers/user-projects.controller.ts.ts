import {Request, Response} from 'express';
import projectService from '../services/project.service';

class UserProjectsController {

    async getProjectsForUser(req: Request<{ userId: string }, never, { id: number, name: string, description: string }[], { limit: string, offset: string }>, res: Response) {
        const limit: number | undefined = req.query.limit ? Number(req.query.limit) : undefined
        const offset: number | undefined = req.query.offset ? Number(req.query.offset) : undefined
        let projects = await projectService.findProjectsByUserId(Number(req.params.userId), limit, offset);
        res.status(201).send(projects);
    }

    async linkProjectsToUser(req: Request<{ userId: string }, never, { "projectIds": string[] }>, res: Response) {
        await projectService.linkProjectsToUser(Number(req.params.userId), req.body.projectIds)
        res.status(201).end()
    }
}

export const userProjectsController = new UserProjectsController();
