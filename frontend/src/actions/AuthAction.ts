import { GET_AUTH_INFO_API as AUTH_INFO_API, LOGIN_API, USER_AUTH_CREDENTIALS_API, USER_TOKEN_REFRESH_API } from "../constants/apiEndpoints";
import { apiHttpGET, apiHttpPOST, apiHttpPUT, getResponseErrorMsg, tokenConfig } from "../misc/httpHelper";
import { TAuthInfo, TLoginData } from "../models/Auth/Auth";
import { QueryResultCallback } from "../models/Callback/Callback";
import { AuthStoreActions } from "../redux/services/auth/actions";
import { UserStoreActions } from "../redux/services/user/actions";

type AuthManagerConfig = {
    postLoginCallback: (data: TLoginData) => void;
    postLogoutCallback: () => void;
};

export class AuthAction {
    static async fetchAuthInfo(cb: QueryResultCallback<TAuthInfo>) {
        try {
            const resp = await apiHttpGET(AUTH_INFO_API);
            cb(null, resp.data);
        } catch (err: any) {
            cb(err);
        }
    }

    static async refreshToken(cb: QueryResultCallback<TLoginData | boolean | undefined>, token?: string | null) {
        try {
            const mToken = token || AuthStoreActions.getUserToken();
            if (mToken) {
                const resp = await apiHttpGET(USER_TOKEN_REFRESH_API, tokenConfig(mToken));
                const data: TLoginData = resp.data;
                AuthStoreActions.saveUserToken(data.access_token);
                UserStoreActions.saveUser(data.adminData);
                cb(null, resp.data);
            } else {
                cb("Not Authorized", true);
            }
        } catch (err: any) {
            const isFailedAuth = Boolean(err.response && err.response.status === 401);
            const errMsg = getResponseErrorMsg(err);
            cb(errMsg, isFailedAuth);
        }
    }

    static async attemptUserReAuthentication(cb: QueryResultCallback<TLoginData | boolean | undefined>, token?: string) {
        const mToken = token || AuthStoreActions.getUserToken();
        if (AuthStoreActions.isUserAuthenticated()) {
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

    static async loginUser(email: string, password: string) {
        try {
            const resp = await apiHttpPOST(LOGIN_API, undefined, { email, password });
            const respData: TLoginData = resp.data;
            AuthStoreActions.saveUserToken(respData.access_token);
            UserStoreActions.saveUser(respData.adminData);
            AuthStoreActions.saveUserAuthCredentials(email, password);

            return respData;
        } catch (error) {
            throw new Error(getResponseErrorMsg(error as any));
        }
    }

    static async updateCredentials(creds: { email: string; password: string; oldPassword?: string }, autoLogin: boolean) {
        try {
            const resp = await apiHttpPUT(USER_AUTH_CREDENTIALS_API, creds);
            if (autoLogin) {
                return await this.loginUser(creds.email, creds.password);
            }
            return resp.data;
        } catch (err: any) {
            throw new Error(getResponseErrorMsg(err));
        }
    }

    static async getAccessToken() {
        return AuthStoreActions.getUserToken();
    }

    static dispatchLogout() {
        AuthStoreActions.logoutUser();
    }
}
