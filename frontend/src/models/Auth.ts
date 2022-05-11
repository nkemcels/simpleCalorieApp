import { IUserData } from "./User";

export type TLoginData = {
    accessToken: string;
    userId: string;
    tokenType: string;
    expiresIn: number;
    userData: IUserData;
};

export type TAuthCredentials = {
    email: string;
    password: string;
};

export type TSignupData = {
    weight: number;
    height: number;
    gender: "male" | "female";
    dateOfBirth: string;
    names: string;
    email: string;
    password: string;
};
