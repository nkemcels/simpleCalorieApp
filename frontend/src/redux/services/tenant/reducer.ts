import { ITenant, ITenantDetails } from "./../../../models/Tenant/Tenant";
import { ICustomer } from "../../../models/Customer/Customer";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type TenantStateT = {
    tenants: ITenant[];
    loadingData: boolean;
    dataLoaded: boolean;
    loadedTenants: { [k: string]: ITenantDetails | undefined };
};

export const initialState: TenantStateT = {
    loadingData: false,
    dataLoaded: false,
    tenants: [],
    loadedTenants: {},
};

// App Reducer
export default createReducer<TenantStateT>(initialState, {
    [ActionTypes.SAVE_TENANTS]: (state, payload: ITenant[]) => ({
        ...state,
        tenants: payload,
        dataLoaded: true,
    }),
    [ActionTypes.LOADING_TENANTS]: (state, payload: boolean) => ({
        ...state,
        loadingData: payload,
    }),
    [ActionTypes.SAVE_LOADED_TENANT]: (state, payload: { tenantId: string; data: ITenantDetails }) => ({
        ...state,
        loadedTenants: {
            ...state.loadedTenants,
            [payload.tenantId]: payload.data,
        },
    }),

    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
