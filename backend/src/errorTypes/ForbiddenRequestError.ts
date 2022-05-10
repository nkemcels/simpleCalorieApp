import { AppError, IErrorMessage } from "./AppError";

export class ForbiddenRequestError extends AppError {
	public statusCode = 403;
	constructor(public message: string) {
		super(message);
		Object.setPrototypeOf(this, ForbiddenRequestError.prototype);
	}
	serializeError(): IErrorMessage {
		return { message: this.message };
	}
}
