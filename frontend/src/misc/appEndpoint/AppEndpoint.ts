import { AxiosError, AxiosRequestConfig } from "axios";
import { AuthStoreActions } from "../../redux/services/auth/actions";
import { CustomerStoreActions } from "../../redux/services/customer/actions";
import { UserStoreActions } from "../../redux/services/user/actions";
import { apiHTTPRRequest, tokenConfig } from "../httpHelper";

/**
 * Formats the URL so as to provide values for the its dynamic sections or
 * query strings. <br>
 * **Example**: `formatUrl("http://www.mydomain.com/{id}/{name}", {"query":"query_value"}, {id:1234, name:"name_value"})`
 * will return `http://www.mydomain.com/1234/name_value?query=query_value`
 * @param {String} endpoint The endpoint url
 * @param {Object} queryStrings Object containing the query string parameters
 * @param {Object} dynamicContent Object containing the values for the dynamic parts of the url
 */
export function formatUrl(endpoint: string, queryStrings?: { [k: string]: string | undefined } | null, dynamicContent?: { [k: string]: string }) {
    let qs = "";
    queryStrings = queryStrings || {};
    dynamicContent = dynamicContent || {};

    Object.keys(queryStrings).forEach((key) => {
        if (queryStrings![key]) {
            const value = encodeURIComponent(queryStrings![key] || "");
            qs = `${qs}${qs.length > 0 ? "&" : ""}${key}=${value}`;
        }
    });

    Object.keys(dynamicContent).forEach((key) => {
        if (dynamicContent![key]) {
            const re = RegExp(`{${key}}`);
            endpoint = endpoint.replace(re, dynamicContent![key]);
        }
    });

    if (qs.length > 0) {
        endpoint = `${endpoint}?${qs}`;
    }

    return endpoint;
}

export class APIManager {
    static getResponseErrorMsg = async (error: AxiosError) => {
        try {
            return error.response && error.response.data
                ? error.response.data.message
                    ? error.response.data.message
                    : error.response.data.error
                    ? error.response.data.error
                    : error.response.data instanceof Blob
                    ? JSON.parse(await error.response.data.text()).message || "Something went wrong.."
                    : error.response.data
                : error.message
                ? `${JSON.stringify(error.message, null, 2)}`
                : error
                ? `${JSON.stringify(error, null, 2)}`
                : "Something went wrong";
        } catch (err) {
            return "Something went wrong...";
        }
    };

    static async request(req: AxiosRequestConfig) {
        const token = AuthStoreActions.getUserToken();
        // const customerId = CustomerStoreActions.getCustomers;
        const userId = UserStoreActions.getUser()?._id;
        req.url = formatUrl(req.url || "", null, { adminId: userId || "" });
        const reqHeaders = tokenConfig(token || "", req.headers).headers;
        try {
            return await apiHTTPRRequest({ ...req, headers: { ...reqHeaders }, timeout: 15 * 60 * 60 * 1000 });
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                // TODO: Reauthenticate here and retry the request
                throw await APIManager.getResponseErrorMsg(err);
            } else throw await APIManager.getResponseErrorMsg(err);
        }
    }

    static get(endpoint: string, headers?: { [k: string]: any }) {
        return APIManager.request({
            method: "GET",
            url: endpoint,
            headers: headers,
        });
    }

    static post(endpoint: string, body: any, headers?: { [k: string]: any }) {
        return APIManager.request({
            method: "POST",
            url: endpoint,
            headers: headers,
            data: body,
        });
    }

    static put(endpoint: string, body: any, headers?: { [k: string]: any }) {
        return APIManager.request({
            method: "PUT",
            url: endpoint,
            headers: headers,
            data: body,
        });
    }

    static patch(endpoint: string, body?: any, headers?: { [k: string]: any }) {
        return APIManager.request({
            method: "PATCH",
            url: endpoint,
            headers: headers,
            data: body,
        });
    }

    static delete(endpoint: string, headers?: { [k: string]: any }) {
        return APIManager.request({
            method: "DELETE",
            url: endpoint,
            headers: headers,
        });
    }
}
