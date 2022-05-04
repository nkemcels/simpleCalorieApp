import { DEVICES_API } from "./../constants/apiEndpoints";
import { APIManager } from "../misc/appEndpoint/AppEndpoint";
import { AuthStoreActions } from "../redux/services/auth/actions";
import { DeviceStoreActions } from "../redux/services/device/actions";

export class DeviceAction {
    static async loadDevices() {
        try {
            DeviceStoreActions.loadingDevices(true);
            const resp = await APIManager.get(DEVICES_API);
            DeviceStoreActions.saveDevices(resp.data);
        } catch (err: any) {
            throw err;
        } finally {
            DeviceStoreActions.loadingDevices(false);
        }
    }

    static dispatchLogout() {
        AuthStoreActions.logoutUser();
    }
}
