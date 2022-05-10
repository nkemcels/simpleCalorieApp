import { NextFunction, Request, Response } from "express";
import { AuthRouteHandler } from "../services/auth/controller";

/**
 * Authenticates user routes.
 *
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const checkUserAuth = (req: Request, res: Response, next: NextFunction) => {
    AuthRouteHandler.checkUserAuth(req, res, next);
};
