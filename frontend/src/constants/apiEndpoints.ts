const API_BASE_URL =
    process.env.APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + 8080 : ""}`;

export const BASE_URL = API_BASE_URL;
export const BASE_API = `${BASE_URL}/api/v1`;
export const LOGIN_API = `${BASE_API}/auth/login`;
export const SIGNUP_API = `${BASE_API}/auth/signup`;
export const TOKEN_REFRESH_API = `${BASE_API}/auth/refreshToken`;
export const USER_AUTH_CREDENTIALS_API = `${BASE_API}/users/me/updateAuthCredentials`;
export const USER_DATA_API = `${BASE_API}/users/me/data`;
