import {NextFunction, Request, Response, Router} from 'express';
import {UpsertProjectDto} from '../dto/upsert-project.dto';
import { projectsController } from '../controllers/project.controller';
import path from 'node:path';

const homeRoutes = Router()

homeRoutes.get('', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

export { homeRoutes }