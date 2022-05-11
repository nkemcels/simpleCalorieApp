import { History, State } from "history";
import { TNetworkState } from "../../../models/_Utils/NetworkState";
import { getAppStore } from "../../store";
import ActionTypes from "./actionTypes";

export class AppStoreActions {
    static saveRouterHistory<T extends State>(routerHistory: History<T>) {
        return getAppStore().dispatch({ type: ActionTypes.SAVE_ROUTER_HISTORY, payload: routerHistory });
    }
    static getHistory() {
        return getAppStore().getState().app.history;
    }
    static updateNetworState(state: TNetworkState) {
        getAppStore().dispatch({ type: ActionTypes.UPDATE_NETWORK_STATE, payload: state });
    }
    static getNetworkState() {
        return getAppStore().getState().app.networkState;
    }
}
