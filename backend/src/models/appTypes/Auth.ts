import { LeanDocument, Types } from "mongoose";
import { UserDoc } from "../db/User/User";

export type UserAuthCredentials = {
    email: string;
    password: string;
};

export type UserLoginData = {
    accessToken: string;
    userId: Types.ObjectId;
    tokenType: string;
    expiresIn: number;
    userData: LeanDocument<Omit<UserDoc, "password">>;
};
