export class CustomError extends Error {
    public status: number

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400);
        this.name = 'BadRequestError';
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}