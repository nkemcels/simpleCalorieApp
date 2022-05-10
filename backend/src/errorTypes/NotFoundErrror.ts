import { AppError, IErrorMessage } from "./AppError";

export class NotFoundError extends AppError {
    public statusCode = 404;
    constructor() {
        super("NotFoundError");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeError(): IErrorMessage {
        return { message: "Not Found" };
    }
}
