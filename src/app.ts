import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware example
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// JSON parsing middleware
app.use(express.json());

app.use('/users', userRoutes);

// A simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});