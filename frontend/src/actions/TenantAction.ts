import {
    TENANTS_API,
    TENANT_DETAILS_API,
    TENANT_API_KEYS_API,
    TENANT_API_KEY_ITEM_API,
    TENANT_APPLICATION_ITEM_API,
    TENANT_APPLICATIONS_API,
} from "./../constants/apiEndpoints";
import { APIManager, formatUrl } from "../misc/appEndpoint/AppEndpoint";
import { CUSTOMERS_API } from "../constants/apiEndpoints";
import { AuthStoreActions } from "../redux/services/auth/actions";
import { TenantStoreActions } from "../redux/services/tenant/actions";
import { ITenant, TTenantApplicationType } from "../models/Tenant/Tenant";

export class TenantAction {
    static async loadTenants() {
        try {
            TenantStoreActions.loadingTenants(true);
            const resp = await APIManager.get(TENANTS_API);
            TenantStoreActions.saveTenants(resp.data);
        } catch (err: any) {
            throw err;
        } finally {
            TenantStoreActions.loadingTenants(false);
        }
    }

    static async loadTenantDetails(tenantId: string) {
        try {
            const resp = await APIManager.get(formatUrl(TENANT_DETAILS_API, null, { tenantId }));
            TenantStoreActions.saveLoadedTenant(tenantId, resp.data);
        } catch (err: any) {
            throw err;
        }
    }

    static async generateTenantAPIKey(tenantId: string, expiresAt?: string) {
        try {
            await APIManager.post(formatUrl(TENANT_API_KEYS_API, null, { tenantId }), { expiresAt });
            return await TenantAction.loadTenantDetails(tenantId);
        } catch (err: any) {
            throw err;
        }
    }

    static async addNewApplication(tenantId: string, name: string, type: TTenantApplicationType) {
        try {
            await APIManager.post(formatUrl(TENANT_APPLICATIONS_API, null, { tenantId }), { name, type });
            return await TenantAction.loadTenantDetails(tenantId);
        } catch (err: any) {
            throw err;
        }
    }

    static async addNewTenant(data: Partial<ITenant>) {
        try {
            await APIManager.post(TENANTS_API, data);
            return await TenantAction.loadTenants();
        } catch (err: any) {
            throw err;
        }
    }

    static async updateApplication(tenantId: string, applicationId: string, name: string) {
        try {
            await APIManager.put(formatUrl(TENANT_API_KEYS_API, null, { tenantId, applicationId }), { name });
            return await TenantAction.loadTenantDetails(tenantId);
        } catch (err: any) {
            throw err;
        }
    }

    static async deleteTenantAPIKey(tenantId: string, keyId: string) {
        try {
            await APIManager.delete(formatUrl(TENANT_API_KEY_ITEM_API, null, { tenantId, keyId }));
            return await TenantAction.loadTenantDetails(tenantId);
        } catch (err: any) {
            throw err;
        }
    }

    static async deleteApplication(tenantId: string, applicationId: string) {
        try {
            await APIManager.delete(formatUrl(TENANT_APPLICATION_ITEM_API, null, { tenantId, applicationId }));
            return await TenantAction.loadTenantDetails(tenantId);
        } catch (err: any) {
            throw err;
        }
    }

    static dispatchLogout() {
        AuthStoreActions.logoutUser();
    }
}
