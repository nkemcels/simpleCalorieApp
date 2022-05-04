import { combineReducers } from "redux";
import app, { AppStateT } from "./services/app/reducer";
import auth, { AuthStateT } from "./services/auth/reducer";
import user, { UserStateT } from "./services/user/reducer";
import notifications, { NotificationStateT } from "./services/notifications/reducer";
import customer, { CustomerStateT } from "./services/customer/reducer";
import tenant, { TenantStateT } from "./services/tenant/reducer";
import device, { DeviceStateT } from "./services/device/reducer";

// Root state of the store
export type RootState = {
    app: AppStateT;
    auth: AuthStateT;
    user: UserStateT;
    tenant: TenantStateT;
    device: DeviceStateT;
    customer: CustomerStateT;
    notifications: NotificationStateT;
};

// Root reducer configuration
const rootReducer = combineReducers<RootState>({
    app,
    auth,
    user,
    customer,
    tenant,
    device,
    notifications,
});

export default rootReducer;
