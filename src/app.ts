import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import errorHandler from './util/errorHandler';
import {UserController} from './controllers/userController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// JSON parsing middleware
app.use(express.json());

UserController.register(app);

// Middleware to handle unhandled exceptions from the application
app.use(errorHandler)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});