import { AppError, IErrorMessage } from "./AppError";

export class InternalError extends AppError {
    public statusCode = 500;
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, InternalError.prototype);
    }
    serializeError(): IErrorMessage {
        return { message: this.message };
    }
}
