import { APIManager, formatUrl } from "./../misc/appEndpoint/AppEndpoint";
import {
    CUSTOMERS_API,
    CUSTOMER_APPLICATIONS_API,
    CUSTOMER_APPLICATION_APPROVE_API,
    CUSTOMER_APPLICATION_ITEM_API,
    CUSTOMER_APPLICATION_REJECT_API,
    CUSTOMER_DETAILS_API,
    DOWNLOAD_FILE_API,
} from "../constants/apiEndpoints";
import { AuthStoreActions } from "../redux/services/auth/actions";
import { CustomerStoreActions } from "../redux/services/customer/actions";

export class CustomerAction {
    static async loadCustomers() {
        try {
            CustomerStoreActions.loadingCustomers(true);
            const resp = await APIManager.get(CUSTOMERS_API);
            CustomerStoreActions.saveCustomers(resp.data);
        } catch (err: any) {
            throw err;
        } finally {
            CustomerStoreActions.loadingCustomers(false);
        }
    }

    static async loadCustomerDetails(customerId: string) {
        try {
            const resp = await APIManager.get(formatUrl(CUSTOMER_DETAILS_API, null, { customerId }));
            CustomerStoreActions.saveCustomerDetails(customerId, resp.data);
        } catch (err: any) {
            throw err;
        }
    }

    static async loadApplications() {
        try {
            CustomerStoreActions.loadingApplications(true);
            const resp = await APIManager.get(CUSTOMER_APPLICATIONS_API);
            CustomerStoreActions.saveApplications(resp.data);
        } catch (err: any) {
            throw err;
        } finally {
            CustomerStoreActions.loadingApplications(false);
        }
    }

    static async loadApplicationData(field: "profilePhoto" | "licencePhoto" | "legalAgreement", applicationId: string, blobName: string) {
        try {
            const resp = await APIManager.request({
                method: "POST",
                data: { blobName },
                responseType: "blob",
                url: DOWNLOAD_FILE_API,
            });
            CustomerStoreActions.updateApplicationDataField(field, applicationId, resp.data);
        } catch (err: any) {
            throw err;
        }
    }

    static async approveCustomerApplication(applicationId: string) {
        try {
            const application = CustomerStoreActions.getApplications().find((t) => t._id === applicationId);
            if (!application) throw new Error("Application not found or loaded");
            await APIManager.put(formatUrl(CUSTOMER_APPLICATION_APPROVE_API, null, { applicationId }), undefined);
            CustomerStoreActions.updateApplication(applicationId, { applicationStatus: "approved" });
            return application;
        } catch (err: any) {
            throw err;
        }
    }

    static async rejectCustomerApplication(applicationId: string, reason: string) {
        try {
            const application = CustomerStoreActions.getApplications().find((t) => t._id === applicationId);
            if (!application) throw new Error("Application not found or loaded");
            await APIManager.put(formatUrl(CUSTOMER_APPLICATION_REJECT_API, null, { applicationId }), { reason });
            CustomerStoreActions.updateApplication(applicationId, { applicationStatus: "rejected" });
            return application;
        } catch (err: any) {
            throw err;
        }
    }

    static async deleteCustomerApplication(applicationId: string) {
        try {
            await APIManager.delete(formatUrl(CUSTOMER_APPLICATION_ITEM_API, null, { applicationId }));
            CustomerStoreActions.removeApplication(applicationId);
        } catch (err: any) {
            throw err;
        }
    }

    static dispatchLogout() {
        AuthStoreActions.logoutUser();
    }
}
