import { History } from "history";
import { TNetworkState } from "../../../models/_Utils/NetworkState";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

type AppHistory = History & { goBack: () => void };

export type AppStateT = {
    history?: AppHistory;
    networkState?: TNetworkState;
};

export const initialState: AppStateT = {
    networkState: undefined,
};

// App Reducer
export default createReducer<AppStateT>(initialState, {
    [ActionTypes.SAVE_ROUTER_HISTORY]: (state, payload: AppHistory) => ({
        // Saves the apps router history to be used out of react component context

        ...state,
        history: payload,
    }),
    [ActionTypes.UPDATE_NETWORK_STATE]: (state, payload: TNetworkState) => ({
        // Saves the apps router history to be used out of react component context

        ...state,
        networkState: payload,
    }),
});
