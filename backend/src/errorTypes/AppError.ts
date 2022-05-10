export interface IErrorMessage {
    message: string;
    errors?: {
        reason: string;
        field?: string;
    }[];
}

export abstract class AppError extends Error {
    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, AppError.prototype);
    }

    abstract statusCode: number;
    abstract serializeError(): IErrorMessage;
}
