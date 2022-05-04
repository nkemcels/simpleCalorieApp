import { IDevice } from "./../../../models/Device/Device";
import ActionTypes from "./actionTypes";
import { getAppStore } from "../../store";

export class DeviceStoreActions {
    static loadingDevices(loading: boolean) {
        getAppStore().dispatch({ type: ActionTypes.LOADING_DEVICES, payload: loading });
    }
    static saveDevices(devices: IDevice[]) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_DEVICES, payload: devices });
    }
    static getDevices() {
        return getAppStore().getState().device.devices;
    }
}
