import ActionTypes from "./actionTypes";
import { getAppStore } from "../../store";
import { LOCAL_STORAGE_KEYS } from "../../../constants/appVars";

export class AuthStoreActions {
    static authenticatingUser(authenticating: boolean) {
        getAppStore().dispatch({ type: ActionTypes.SET_AUTHENTICATING, payload: authenticating });
    }

    static saveUserToken(token: string, persist = true) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_USER_TOKEN, payload: token });
        if (persist) localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    }

    static isUserAuthenticated() {
        return getAppStore().getState().auth.isAuthenticated;
    }

    static saveUserAuthCredentials(email: string, password: string) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_AUTH_CREDENTIALS, payload: { email, password } });
    }

    static getUserToken() {
        const token = getAppStore().getState().auth.accessToken;
        if (token) return token;

        return localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    }

    static getUserAuthCredentials() {
        const { email, password } = getAppStore().getState().auth;
        return { email, password };
    }

    static logoutUser() {
        localStorage.clear();
        getAppStore().dispatch({ type: ActionTypes.LOGOUT_ACTION });
    }
}
