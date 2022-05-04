import { IDevice } from "./../../../models/Device/Device";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type DeviceStateT = {
    devices: IDevice[];
    loadingData: boolean;
    dataLoaded: boolean;
};

export const initialState: DeviceStateT = {
    loadingData: false,
    dataLoaded: false,
    devices: [],
};

// App Reducer
export default createReducer<DeviceStateT>(initialState, {
    [ActionTypes.SAVE_DEVICES]: (state, payload: IDevice[]) => ({
        ...state,
        devices: payload,
        dataLoaded: true,
    }),
    [ActionTypes.LOADING_DEVICES]: (state, payload: boolean) => ({
        ...state,
        loadingData: payload,
    }),

    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
