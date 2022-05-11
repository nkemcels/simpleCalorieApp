import { NextFunction, Request, Response } from "express";
import moment from "moment";
import Logger from "../../utils/Logger";
import { CalorieEntryManager } from "./manager";

export class CalorieEntryRouteHandler {
    static async addNewEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const entry = await new CalorieEntryManager().addNewEntry(req.body);
            res.status(200).json(entry);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async getEntriesByDate(req: Request, res: Response, next: NextFunction) {
        try {
            const { date } = req.query;
            const entries = await new CalorieEntryManager().getEntriesByDate(
                moment(date as string)
                    .utc()
                    .toDate()
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
            const startDate = moment(start as string)
                .utc()
                .toDate();
            const endDate = moment(end as string)
                .utc()
                .toDate();
            const entries = await new CalorieEntryManager().getEntriesByDateRange(startDate, endDate);
            res.status(200).json(entries);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async updateEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const { entryId } = req.params;
            const entry = await new CalorieEntryManager().updateEntry(entryId, req.body);
            res.status(200).json(entry);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }

    static async deleteEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const { entryId } = req.params;
            const entry = await new CalorieEntryManager().deleteEntry(entryId);
            res.status(200).json(entry);
        } catch (err) {
            Logger.error(`${err}`);
            next(err);
        }
    }
}
