import express from 'express';
import dotenv from 'dotenv';
import errorHandlingMiddleware from './util/error-handler';
import {usersController} from './controllers/user.controller';
import {projectcontroller} from './controllers/project.controller';
import path from 'node:path';
import {homeController} from './controllers/home.controller';
import {loggingMiddleware} from './util/logging.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app
    .use(loggingMiddleware)
    .use(express.json())
    .use(express.static(path.join(__dirname, '../public')))
    .use('/', homeController)
    .use('/users', usersController)
    .use('/projects', projectcontroller)
    .use(errorHandlingMiddleware)

    // Log when server is started and which port it's running on
    .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});