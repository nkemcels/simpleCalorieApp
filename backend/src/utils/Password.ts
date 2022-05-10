import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import pwdGenerator from "generate-password";

const scryptAsync = promisify(scrypt);

export class PasswordManager {
    static async hashPassword(password: string) {
        const hashedPwd = (await scryptAsync(password, "", 1)) as Buffer;
        return hashedPwd.toString();
    }

    static async comparePassword(password: string, inputHash: string) {
        const currentHash = (await scryptAsync(password, "", 1)) as Buffer;
        return currentHash.toString() === inputHash;
    }

    static async generatePassword(length = 12) {
        return pwdGenerator.generate({
            length,
            numbers: true,
            symbols: false,
            uppercase: true,
        });
    }

    static generateSimpleTokenId(length = 12) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
