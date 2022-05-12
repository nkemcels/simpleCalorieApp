import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { Types } from "mongoose";
import Logger from "../../utils/Logger";
import { CalorieEntryManager } from "./manager";

export class CalorieEntryRouteHandler {
    static async addNewEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id: userId } = req.user!;
            const entry = await new CalorieEntryManager().addNewEntry(req.body, userId);
            res.status(200).json(entry);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async getEntriesByDate(req: Request, res: Response, next: NextFunction) {
        try {
            const { date } = req.query;
            const { _id: userId } = req.user!;
            const entries = await new CalorieEntryManager().getEntriesByDate(
                moment(date as string)
                    .utc()
                    .toDate(),
                userId
            );
            res.status(200).json(entries);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async getEntriesByDateRange(req: Request, res: Response, next: NextFunction) {
        try {
            const { start, end } = req.query;
            const { _id: userId } = req.user!;
            const startDate = moment(start as string)
                .utc()
                .toDate();
            const endDate = moment(end as string)
                .utc()
                .toDate();
            const entries = await new CalorieEntryManager().getEntriesByDateRange(startDate, endDate, userId);
            res.status(200).json(entries);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async updateEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const { entryId } = req.params;
            const { _id: userId } = req.user!;
            const entry = await new CalorieEntryManager().updateEntry(Types.ObjectId(entryId), req.body, userId);
            res.status(200).json(entry);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async deleteEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const { entryId } = req.params;
            const { _id: userId } = req.user!;
            const entry = await new CalorieEntryManager().deleteEntry(Types.ObjectId(entryId), userId);
            res.status(200).json(entry);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async getCalorieStats(req: Request, res: Response, next: NextFunction) {
        try {
            const { date } = req.query;
            const { _id: userId } = req.user!;
            const entry = await new CalorieEntryManager().getCalorieStats(
                userId,
                moment(date as string)
                    .utc()
                    .toDate()
            );
            res.status(200).json(entry);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }
}
