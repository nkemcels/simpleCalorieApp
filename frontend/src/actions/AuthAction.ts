import { LOGIN_API, SIGNUP_API, USER_AUTH_CREDENTIALS_API, TOKEN_REFRESH_API } from "../constants/apiEndpoints";
import { HTTPHelper } from "../misc/httpHelper";
import { TAuthCredentials, TAuthInfo, TLoginData, TSignupData } from "../models/Auth/Auth";
import { QueryResultCallback } from "../models/Callback/Callback";
import { AuthStoreActions } from "../redux/services/auth/actions";
import { UserStoreActions } from "../redux/services/user/actions";

export class AuthAction {
    static store = AuthStoreActions;
    // static async fetchAuthInfo(cb: QueryResultCallback<TAuthInfo>) {
    //     try {
    //         const resp = await HTTPHelper.get(AUTH_INFO_API);
    //         cb(null, resp.data);
    //     } catch (err: any) {
    //         cb(err);
    //     }
    // }

    static async refreshToken(cb: QueryResultCallback<TLoginData | boolean | undefined>, token?: string | null) {
        try {
            const mToken = token || AuthAction.store.getUserToken();
            if (mToken) {
                const resp = await HTTPHelper.get(TOKEN_REFRESH_API, HTTPHelper.tokenConfig(mToken));
                const data: TLoginData = resp.data;
                AuthAction.store.saveUserToken(data.accessToken);
                UserStoreActions.saveUser(data.userData);
                cb(null, resp.data);
            } else {
                cb("Not Authorized", true);
            }
        } catch (err: any) {
            const isFailedAuth = Boolean(err.response && err.response.status === 401);
            const errMsg = HTTPHelper.getResponseErrorMsg(err);
            cb(errMsg, isFailedAuth);
        }
    }

    static async attemptUserReAuthentication(cb: QueryResultCallback<TLoginData | boolean | undefined>, token?: string) {
        const mToken = token || AuthAction.store.getUserToken();
        if (AuthAction.store.isUserAuthenticated()) {
            cb(null, true);
        } else {
            AuthAction.refreshToken((err, resp) => {
                if (err) cb(err, resp);
                else {
                    cb(null, false);
                }
            }, mToken);
        }
    }

    static async loginUser(creds: TAuthCredentials) {
        try {
            const resp = await HTTPHelper.post(LOGIN_API, creds);
            const respData: TLoginData = resp.data;
            AuthAction.store.saveUserToken(respData.accessToken);
            UserStoreActions.saveUser(respData.userData);
            AuthAction.store.saveUserAuthCredentials(creds);

            return respData;
        } catch (error) {
            throw new Error(HTTPHelper.getResponseErrorMsg(error as any));
        }
    }

    static async createUserAccount(userAccData: TSignupData) {
        try {
            const resp = await HTTPHelper.post(SIGNUP_API, userAccData);
            return resp.data;
        } catch (error) {
            throw new Error(HTTPHelper.getResponseErrorMsg(error as any));
        }
    }

    static async updateCredentials(creds: TAuthCredentials & { oldPassword: string }, autoLogin: boolean) {
        const resp = await HTTPHelper.put(USER_AUTH_CREDENTIALS_API, creds);
        if (autoLogin) {
            return await this.loginUser(creds);
        }
        return resp.data;
    }

    static async getAccessToken() {
        return AuthAction.store.getUserToken();
    }

    static dispatchLogout() {
        AuthAction.store.logoutUser();
    }
}
