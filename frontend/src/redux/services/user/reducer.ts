import { IUserData } from "../../../models/User";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type UserStateT = {
    userData?: IUserData;
    loadingData: boolean;
    userDataLoaded: boolean;
};

export const initialState: UserStateT = {
    loadingData: false,
    userDataLoaded: false,
    userData: undefined,
};

// App Reducer
export default createReducer<UserStateT>(initialState, {
    [ActionTypes.SAVE_USER]: (state, payload: IUserData) => ({
        ...state,
        userData: payload,
        userDataLoaded: true,
    }),
    [ActionTypes.LOADING_USER]: (state, payload: boolean) => ({
        ...state,
        loadingData: payload,
    }),

    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
