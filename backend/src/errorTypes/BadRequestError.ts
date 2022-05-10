import { AppError, IErrorMessage } from "./AppError";

export class BadRequestError extends AppError {
    public statusCode = 400;
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeError(): IErrorMessage {
        return { message: this.message };
    }
}
