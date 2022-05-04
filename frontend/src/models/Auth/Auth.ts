import { TUserData } from "./../User/User";
export type TAuthInfo = {
    signupURL: string;
    authDomain: string;
    authID: string;
    dealerGroupSignupURL: string;
};

export type TLoginData = {
    access_token: string;
    userId: string;
    token_type: string;
    expires_in: number;
    adminData: TUserData;
};

export type TAuthCredentials = {
    email: string;
    password: string;
};
