import { Request } from "express";
import { Types } from "mongoose";
import { UserDoc } from "../../src/models/db/User/User";

declare global {
    declare namespace Express {
        interface Request {
            user?: UserDoc;
            rawBody?: any;
        }
    }
}
