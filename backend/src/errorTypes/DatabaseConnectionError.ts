import { AppError, IErrorMessage } from "./AppError";

export class DatabaseConnectionError extends AppError {
    public statusCode = 500;
    constructor(message?: string) {
        super(message || "DatabaseConnectionError");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeError(): IErrorMessage {
        return { message: "Failed to connect to the database" };
    }
}
