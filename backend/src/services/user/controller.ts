import { NextFunction, Request, Response } from "express";
import Logger from "../../utils/Logger";
import { UserManager } from "./manager";

export class UserRouteHandler {
    static async updateUserCredentials(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id: userId } = req.user!;
            await new UserManager().updateUserPassword(userId, req.body);
            res.status(200).json({ message: "Success" });
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async getUserData(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id: userId } = req.user!;
            const user = await new UserManager().getCompleteUser(userId);
            res.status(200).json({ userId: user.id, userInfo: user.toJSON() });
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async updateUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id: userId } = req.user!;
            const updatedUser = await new UserManager().updateUserInfo(userId, req.body);
            res.status(200).json(updatedUser);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }
}
