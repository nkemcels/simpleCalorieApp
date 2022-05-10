import { AppError, IErrorMessage } from "./AppError";

export class UnAuthorizedRequestError extends AppError {
    public statusCode = 401;
    constructor(private errMsg?: string) {
        super("UnAuthorizedRequestError");
        Object.setPrototypeOf(this, UnAuthorizedRequestError.prototype);
    }
    serializeError(): IErrorMessage {
        return { message: this.errMsg || "You are not authorized" };
    }
}
