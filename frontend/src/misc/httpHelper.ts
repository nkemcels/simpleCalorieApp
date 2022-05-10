import axios, { AxiosError, AxiosRequestConfig } from "axios";
import moment from "moment";
import { AuthAction } from "../actions/AuthAction";
import { RouteAction } from "../actions/RouteAction";
import { TOKEN_REFRESH_API } from "../constants/apiEndpoints";
import { AuthStoreActions } from "../redux/services/auth/actions";
import { getAppStore } from "../redux/store";

// Handles server errors such as 500, 504 etc
const verifyHTTPError = (err: AxiosError) => {
    if (err && err.response && err.response.status == 401) {
        // user needs to authenticate asap
        RouteAction.gotoLogout();
    }
    /*else return err */
    // TODO: Properly handle custom errors
};

export class HTTPHelper {
    /**
     * Sets the token in the request header.
     * @param {String} token
     */
    static tokenConfig = (token: string, extraHeaders?: { [key: string]: string }) => ({
        headers: {
            Authorization: token,
            ...extraHeaders,
        },
    });

    /**
     * Performs a POST request to the provided `endpoint url`.
     * **Example**: `HTTPHelper.get("https://api.mydomain.com/v1/endpoint", myHeaders)`
     * @param {String} url
     * @param {Object} header
     * @param {Boolean}
     */
    static async get(url: string, headers?: { [key: string]: any }) {
        try {
            return HTTPHelper.request({ method: "GET", headers, url });
        } catch (error) {
            verifyHTTPError(error as AxiosError);
            return Promise.reject(HTTPHelper.getResponseErrorMsg(error as AxiosError));
        }
    }

    /**
     * Performs a POST request to the provided `endpoint url`.
     * The request header and body are optional parameters.
     * **Example**: `HTTPHelper.post("https://api.mydomain.com/v1/endpoint", myRequestBody, myHeaders)`
     *
     * @param {string} endpoint The endpoint url
     * @param {object} header The request header
     * @param {object} requestBody The request body
     */
    static async post(url: string, requestBody?: any, headers?: { [key: string]: any }) {
        try {
            return HTTPHelper.request({ method: "POST", headers, url, data: requestBody });
        } catch (error) {
            verifyHTTPError(error as AxiosError);
            return Promise.reject(HTTPHelper.getResponseErrorMsg(error as AxiosError));
        }
    }

    /**
     * Performs a PUT request to the provided `endpoint url`.
     * **Example**: `HTTPHelper.put("https://api.mydomain.com/v1/endpoint", myRequestBody, myHeaders)`
     *
     * @param {String} endpoint The endpoint url
     * @param {Object} header The request header
     * @param {Object} requestBody The request body
     */
    static async put(url: string, requestBody?: any, headers?: { [key: string]: any }) {
        try {
            return HTTPHelper.request({ method: "PUT", headers, url, data: requestBody });
        } catch (error) {
            verifyHTTPError(error as AxiosError);
            return Promise.reject(HTTPHelper.getResponseErrorMsg(error as AxiosError));
        }
    }

    /**
     * Performs a PATCH request to the provided `endpoint url`.
     * **Example**: `HTTPHelper.patch("https://api.mydomain.com/v1/endpoint", myRequestBody, myHeaders)`
     *
     * @param {String} endpoint The endpoint url
     * @param {Object} header The request header
     * @param {Object} requestBody The request body
     */
    static async patch(url: string, requestBody?: any, headers?: { [key: string]: any }) {
        try {
            return HTTPHelper.request({ method: "PATCH", headers, url, data: requestBody });
        } catch (error) {
            verifyHTTPError(error as AxiosError);
            return Promise.reject(HTTPHelper.getResponseErrorMsg(error as AxiosError));
        }
    }

    /**
     * Performs a DELETE request to the provided `endpoint url`.
     * **Example**: `HTTPHelper.delete("https://api.mydomain.com/v1/endpoint", myHeaders)`
     *
     * @param {String} endpoint The endpoint url
     * @param {Object} header The request header
     */
    static async delete(url: string, headers?: { [key: string]: any }) {
        try {
            return HTTPHelper.request({ method: "DELETE", headers, url });
        } catch (error) {
            verifyHTTPError(error as AxiosError);
            return Promise.reject(HTTPHelper.getResponseErrorMsg(error as AxiosError));
        }
    }

    static async request(req: AxiosRequestConfig) {
        try {
            const { headers } = req;
            const token = AuthStoreActions.getUserToken();
            const allHeaders = token ? HTTPHelper.tokenConfig(token, headers) : headers;
            return axios.request({ ...req, headers: allHeaders });
        } catch (error) {
            verifyHTTPError(error as AxiosError);
            return Promise.reject(HTTPHelper.getResponseErrorMsg(error as AxiosError));
        }
    }

    static getResponseErrorMsg = (error: AxiosError) => {
        return error.response && error.response.data
            ? error.response.data.message
                ? error.response.data.message
                : error.response.data
            : error.message
            ? `${JSON.stringify(error.message, null, 2)}`
            : error
            ? `${JSON.stringify(error, null, 2)}`
            : "Something went wrong";
    };
}
