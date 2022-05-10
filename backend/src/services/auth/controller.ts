import { NextFunction, Request, Response } from "express";
import { UnAuthorizedRequestError } from "../../errorTypes/UnAuthorizedRequestError";
import Logger from "../../utils/Logger";
import { AuthManager } from "./manager";

export class AuthRouteHandler {
    /**
     * Returns API access token if the user's authentication credentials are good
     *
     * @param req
     * @param res
     * @param next
     */
    static authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await new AuthManager().authenticateUser(req.body);
            res.status(200).json(data);
        } catch (err) {
            next(err);
            Logger.error(`${err}`);
        }
    };

    /**
     * Registers a new user
     *
     * @param req
     * @param res
     * @param next
     */
    static registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resp = await new AuthManager().registerUser(req.body);
            res.status(201).json(resp);
        } catch (err) {
            next(err);
            Logger.error(`${err}`);
        }
    };

    /**
     * Verifies if a user's access token is still valid.
     * Should be used in-between protected API calls
     *
     * @param req
     * @param res
     * @param next
     */
    static checkUserAuth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers ? req.headers["authorization"] || "" : "";
            if (token.length < 10) throw new UnAuthorizedRequestError();

            const [_, tokenPart] = token.split(" ");

            if (tokenPart) req.user = await new AuthManager().verifyUserToken(tokenPart);
            else req.user = await new AuthManager().verifyUserToken(token);
            next();
        } catch (err) {
            next(err);
            Logger.error(`${err}`);
        }
    };

    /**
     * Refreshes a user's token if and only if it expired.
     *
     * @param req
     * @param res
     * @param next
     */
    static refreshUserToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers ? req.headers["authorization"] : null;
            const adminData = await new AuthManager().refreshUserToken(token || "");
            res.status(200).json(adminData);
        } catch (err) {
            next(err);
            Logger.error(`${err}`);
        }
    };
}
