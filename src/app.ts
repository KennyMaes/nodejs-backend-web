import express from 'express';
import dotenv from 'dotenv';
import errorHandlingMiddleware from './util/error-handler';
import path from 'node:path';
import {loggingMiddleware} from './util/logging.middleware';
import {projectRoutes} from './routes/project.routes';
import {userRoutes} from './routes/user.routes';
import {homeRoutes} from './routes/home.routes';
import {userProjectsRoutes} from './routes/user-projects.routes';

dotenv.config();

const app = express();
const port = 3000;
const host =  "0.0.0.0"

app
    .use(loggingMiddleware)
    .use(express.json())
    .use(express.static(path.join(__dirname, '../public')))
    .use('/', homeRoutes)
    .use('/users', userRoutes, userProjectsRoutes)
    .use('/projects', projectRoutes)
    .use(errorHandlingMiddleware)

    // Log when server is started and which port it's running on
    .listen({host, port}, () => {
    console.log(`Server is running on http://localhost:${port}`);
});