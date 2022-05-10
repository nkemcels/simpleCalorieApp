import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ReqValidationError } from "../errorTypes/ReqValidationError";

export const validationCheck = (req: Request, res: Response, next: NextFunction) => {
	try {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			throw new ReqValidationError(validationErrors.array());
		}
		next();
	} catch (err) {
		next(err);
	}
};
