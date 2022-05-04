import { ICustomer, ICustomerApplication, ICustomerDetails } from "./../../../models/Customer/Customer";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type CustomerStateT = {
    customers: ICustomer[];
    applications: ICustomerApplication[];
    loadedCustomers: { [customerId: string]: ICustomerDetails | undefined };
    loadingData: boolean;
    dataLoaded: boolean;
};

export const initialState: CustomerStateT = {
    loadingData: false,
    dataLoaded: false,
    loadedCustomers: {},
    customers: [],
    applications: [],
};

// App Reducer
export default createReducer<CustomerStateT>(initialState, {
    [ActionTypes.SAVE_CUSTOMERS]: (state, payload: ICustomer[]) => ({
        ...state,
        customers: payload,
        dataLoaded: true,
    }),
    [ActionTypes.LOADING_CUSTOMERS]: (state, payload: boolean) => ({
        ...state,
        loadingData: payload,
    }),
    [ActionTypes.SAVE_CUSTOMER_APPLICATIONS]: (state, payload: ICustomerApplication[]) => ({
        ...state,
        applications: payload,
        dataLoaded: true,
    }),
    [ActionTypes.LOADING_CUSTOMER_APPLICATIONS]: (state, payload: boolean) => ({
        ...state,
        loadingData: payload,
    }),
    [ActionTypes.SAVE_CUSTOMER_DETAILS]: (state, payload: { customerId: string; data: ICustomerDetails }) => ({
        ...state,
        loadedCustomers: { ...state.loadedCustomers, [payload.customerId]: payload.data },
    }),

    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
