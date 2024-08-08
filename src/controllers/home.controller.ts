import {Request, Response, Router} from 'express';
import path from 'node:path';

const homeController  = Router()
homeController.get('', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

export { homeController }