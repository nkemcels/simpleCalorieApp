import { TUserData } from "./../User/User";

export type TLoginData = {
    accessToken: string;
    userId: string;
    tokenType: string;
    expiresIn: number;
    userData: TUserData;
};

export type TAuthCredentials = {
    email: string;
    password: string;
};

export type TSignupData = {
    names: string;
    email: string;
    password: string;
};
