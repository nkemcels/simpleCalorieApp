const API_BASE_URL = 'http://api.calorieapp.celsoppe.com';
//process.env.APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + 8080 : ""}`;

export const BASE_URL = API_BASE_URL;
export const BASE_API = `${BASE_URL}/api/v1`;

// auth endpoints
export const LOGIN_API = `${BASE_API}/auth/login`;
export const SIGNUP_API = `${BASE_API}/auth/signup`;
export const TOKEN_REFRESH_API = `${BASE_API}/auth/refreshToken`;

// user endpoints
export const USER_AUTH_CREDENTIALS_API = `${BASE_API}/users/me/updateAuthCredentials`;
export const USER_DATA_API = `${BASE_API}/users/me/data`;

// calorie entry endpoints
export const NEW_CALORIE_ENTRY_API = `${BASE_API}/calorieEntries/new`;
export const CALORIE_ENTRY_ITEM_API = `${BASE_API}/calorieEntries/{entryId}`;
export const CALORIE_STATS_API = `${BASE_API}/calorieEntries/stats`;
export const CALORIE_ENTRIES_DATE_QUERY_API = `${BASE_API}/calorieEntries/queryDate`;
export const CALORIE_ENTRIES_DATERANGE_QUERY_API = `${BASE_API}/calorieEntries/queryRange`;
