import jwt from "jsonwebtoken";
import { GlobalSettings } from "./GlobalSettings";

export class JsonWebToken {
    static generateToken(data: any, expiresIn = "24h"): string {
        return jwt.sign(data, GlobalSettings.app.jwtSecret, { expiresIn });
    }
    static decodeToken(token: string): any {
        try {
            return jwt.verify(token, GlobalSettings.app.jwtSecret);
        } catch (err) {
            return undefined;
        }
    }
    static getTokenExpirationTime(token: string) {
        const resp = jwt.verify(token, GlobalSettings.app.jwtSecret) as { exp: number } | undefined;
        if (resp) return resp.exp;
    }
}
