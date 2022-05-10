import { LeanDocument, Types } from "mongoose";
import { UserDoc } from "../db/User/User";

export type UserAuthCredentials = {
    email: string;
    password: string;
};

export type TenantUserAuthCredentials = {
    email?: string;
    username?: string;
    password: string;
    tenantId: string;
};

export type AdminLoginData = {
    access_token: string;
    adminId: Types.ObjectId;
    token_type: string;
    expires_in: number;
    adminData: LeanDocument<Omit<UserDoc, "password">>;
};
