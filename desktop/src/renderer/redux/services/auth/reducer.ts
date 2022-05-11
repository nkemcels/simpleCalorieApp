import { TAuthCredentials } from "../../../models/Auth";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type AuthStateT = {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    accessToken?: string;
    tokenExpiresIn?: number; // unix timestamp
    email?: string;
    password?: string;
};

export const initialState: AuthStateT = {
    isAuthenticated: false,
    isAuthenticating: false,
    accessToken: undefined,
    email: undefined,
    password: undefined,
};

// App Reducer
export default createReducer<AuthStateT>(initialState, {
    [ActionTypes.SAVE_USER_TOKEN]: (state, payload: string) => ({
        ...state,
        accessToken: payload,
        isAuthenticated: true,
    }),
    [ActionTypes.SAVE_AUTH_CREDENTIALS]: (state, payload: TAuthCredentials) => ({
        ...state,
        email: payload.email,
        password: payload.password,
    }),
    [ActionTypes.SET_AUTHENTICATING]: (state, payload: boolean) => ({
        ...state,
        isAuthenticating: payload,
    }),
    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
