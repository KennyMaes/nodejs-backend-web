import {NextFunction, Request, Response, Router} from 'express';

const loggingMiddleware = Router()
loggingMiddleware.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

export { loggingMiddleware }