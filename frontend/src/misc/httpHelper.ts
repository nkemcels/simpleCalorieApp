import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Handles server errors such as 500, 504 etc
const handleHTTPError = (err: AxiosError) => {
    /* if(err && err.response && (err.response.status==500 || err.response.status == 504)){
        browserHistory.push(`/${err.response.status}/error`);
    }
    else return err */
    // TODO: Properly handle custom errors
};

/**
 * Sets the token in the request header.
 * @param {String} token
 */
export const tokenConfig = (token: string, extraHeaders?: { [key: string]: string }) => ({
    headers: {
        Authorization: token,
        ...extraHeaders,
    },
});

/**
 * Performs a POST request to the provided `endpoint url`.
 * **Example**: `apiHttpGET("https://api.mydomain.com/v1/endpoint", myHeaders)`
 * @param {String} endpoint
 * @param {Object} header
 * @param {Boolean}
 */
export function apiHttpGET(endpoint: string, header?: { [key: string]: any }) {
    return axios.get(endpoint, header).catch((error) => {
        handleHTTPError(error);

        /* eslint-disable-next-line */
        return Promise.reject(error);
    });
}

/**
 * Performs a POST request to the provided `endpoint url`.
 * The request header and body are optional parameters.
 * **Example**: `apiHttpPOST("https://api.mydomain.com/v1/endpoint", myRequestBody, myHeaders)`
 *
 * @param {string} endpoint The endpoint url
 * @param {object} header The request header
 * @param {object} requestBody The request body
 */
export function apiHttpPOST(endpoint: string, header?: { [key: string]: any }, requestBody?: any) {
    return axios.post(endpoint, requestBody, header).catch((error) => {
        handleHTTPError(error);

        /* eslint-disable-next-line */
        return Promise.reject(error);
    });
}

/**
 * Performs a PUT request to the provided `endpoint url`.
 * **Example**: `apiHttpPUT("https://api.mydomain.com/v1/endpoint", myRequestBody, myHeaders)`
 *
 * @param {String} endpoint The endpoint url
 * @param {Object} header The request header
 * @param {Object} requestBody The request body
 */
export function apiHttpPUT(endpoint: string, header?: { [key: string]: any }, requestBody?: any) {
    return axios.put(endpoint, requestBody, header).catch((error) => {
        handleHTTPError(error);

        /* eslint-disable-next-line */
        return Promise.reject(error);
    });
}

/**
 * Performs a PATCH request to the provided `endpoint url`.
 * **Example**: `apiHttpPATCH("https://api.mydomain.com/v1/endpoint", myRequestBody, myHeaders)`
 *
 * @param {String} endpoint The endpoint url
 * @param {Object} header The request header
 * @param {Object} requestBody The request body
 */
export function apiHttpPATCH(endpoint: string, header: { [key: string]: any }, requestBody: any) {
    return axios.patch(endpoint, requestBody, header).catch((error) => {
        handleHTTPError(error);

        /* eslint-disable-next-line */
        return Promise.reject(error);
    });
}

/**
 * Performs a DELETE request to the provided `endpoint url`.
 * **Example**: `apiHttpDELETE("https://api.mydomain.com/v1/endpoint", myHeaders)`
 *
 * @param {String} endpoint The endpoint url
 * @param {Object} header The request header
 */
export function apiHttpDELETE(endpoint: string, header?: { [key: string]: any }) {
    return axios.delete(endpoint, header).catch((error) => {
        handleHTTPError(error);

        /* eslint-disable-next-line */
        return Promise.reject(error);
    });
}

/**
 * Performs a DELETE request to the provided `endpoint url`.
 * **Example**: `apiHttpDELETE("https://api.mydomain.com/v1/endpoint", myHeaders)`
 *
 * @param {String} endpoint The endpoint url
 * @param {Object} header The request header
 */
export function apiHTTPRRequest(req: AxiosRequestConfig) {
    return axios.request(req).catch((error) => {
        handleHTTPError(error);

        /* eslint-disable-next-line */
        return Promise.reject(error);
    });
}

export const getResponseErrorMsg = (error: AxiosError) => {
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
