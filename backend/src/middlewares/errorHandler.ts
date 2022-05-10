import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorTypes/AppError";

/**
 * Handles errors thrown in route handlers
 *
 * @param error the error that occurred
 * @param req request object
 * @param res response object
 */
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        const statusCode = error.statusCode;
        const errResponse = error.serializeError();

        res.status(statusCode).json(errResponse);
    } else {
        res.status(400).json({ message: error.message || `${error}` });
    }
};
