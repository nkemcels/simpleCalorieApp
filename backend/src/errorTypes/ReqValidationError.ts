import { ValidationError } from "express-validator";
import { AppError, IErrorMessage } from "./AppError";

export class ReqValidationError extends AppError {
	public statusCode = 422;
	constructor(private errors: ValidationError[]) {
		super("ReqValidationError");
		Object.setPrototypeOf(this, ReqValidationError.prototype);
	}
	serializeError(): IErrorMessage {
		return { message: "Validation Errors", errors: this.errors.map((t) => ({ reason: t.msg, field: t.param })) };
	}
}
