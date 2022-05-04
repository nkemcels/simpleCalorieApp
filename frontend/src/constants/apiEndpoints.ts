const API_BASE_URL =
    process.env.APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + 8080 : ""}`;

export const BASE_URL = API_BASE_URL;
export const BASE_API = `${BASE_URL}/api/v1`;
export const LOGIN_API = `${BASE_API}/admin/auth/login`;
export const GET_AUTH_INFO_API = `${BASE_API}/admin/auth/authInfo`;
export const USER_TOKEN_REFRESH_API = `${BASE_API}/admin/auth/refreshToken`;
export const USER_AUTH_CREDENTIALS_API = `${BASE_API}/admin/me/updateAuthCredentials`;
export const USER_NOTIFICATION_SETTINGS_API = `${BASE_API}/admin/me/notificationSettings`;
export const USER_DATA_API = `${BASE_API}/admin/me/data`;
export const DOWNLOAD_FILE_API = `${BASE_API}/admin/files/download`;
