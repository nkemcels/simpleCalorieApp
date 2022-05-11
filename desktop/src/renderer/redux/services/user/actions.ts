import ActionTypes from "./actionTypes";
import { getAppStore } from "../../store";
import { IUserData } from "../../../models/User";

export class UserStoreActions {
    static loadingUser(loading: boolean) {
        getAppStore().dispatch({ type: ActionTypes.LOADING_USER, payload: loading });
    }
    static saveUser(user: IUserData) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_USER, payload: user });
    }
    static getUser() {
        return getAppStore().getState().user.userData;
    }
}
