import { ITenant, ITenantDetails } from "./../../../models/Tenant/Tenant";
import ActionTypes from "./actionTypes";
import { getAppStore } from "../../store";

export class TenantStoreActions {
    static loadingTenants(loading: boolean) {
        getAppStore().dispatch({ type: ActionTypes.LOADING_TENANTS, payload: loading });
    }
    static saveTenants(tenants: ITenant[]) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_TENANTS, payload: tenants });
    }
    static saveLoadedTenant(tenantId: string, data: ITenantDetails) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_LOADED_TENANT, payload: { tenantId, data } });
    }
    static getTenants() {
        return getAppStore().getState().tenant.tenants;
    }
}
