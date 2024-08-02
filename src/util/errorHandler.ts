import {ErrorRequestHandler} from 'express';
import {BadRequestError} from './exceptions';

const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    const status = err instanceof BadRequestError ? 400 : 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ error: message });
};

export default errorHandler;
