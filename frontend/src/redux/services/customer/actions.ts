import { ICustomer, ICustomerApplication, ICustomerDetails } from "./../../../models/Customer/Customer";
import ActionTypes from "./actionTypes";
import { getAppStore } from "../../store";

export class CustomerStoreActions {
    static loadingCustomers(loading: boolean) {
        getAppStore().dispatch({ type: ActionTypes.LOADING_CUSTOMERS, payload: loading });
    }
    static loadingApplications(loading: boolean) {
        getAppStore().dispatch({ type: ActionTypes.LOADING_CUSTOMER_APPLICATIONS, payload: loading });
    }
    static saveCustomers(customers: ICustomer[]) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_CUSTOMERS, payload: customers });
    }
    static saveApplications(applications: ICustomerApplication[]) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_CUSTOMER_APPLICATIONS, payload: applications });
    }

    static saveCustomerDetails(customerId: string, data: ICustomerDetails) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_CUSTOMER_DETAILS, payload: { customerId, data } });
    }

    static updateApplication(applicationId: string, data: Partial<ICustomerApplication>) {
        const applications = getAppStore().getState().customer.applications;
        const updated = applications.map((t) => (t._id === applicationId ? { ...t, ...data } : t));
        CustomerStoreActions.saveApplications(updated);
    }

    static removeApplication(applicationId: string) {
        const items = getAppStore()
            .getState()
            .customer.applications.filter((t) => t._id !== applicationId);
        CustomerStoreActions.saveApplications(items);
    }

    static updateApplicationDataField(field: "profilePhoto" | "licencePhoto" | "legalAgreement", applicationId: string, data: Blob) {
        const application = getAppStore()
            .getState()
            .customer.applications.find((t) => t._id === applicationId);
        if (application) {
            application[field] = { ...application[field], data } as any;
            CustomerStoreActions.updateApplication(applicationId, application);
        }
    }

    static getCustomers() {
        return getAppStore().getState().customer.customers;
    }

    static getApplications() {
        return getAppStore().getState().customer.applications;
    }
}
