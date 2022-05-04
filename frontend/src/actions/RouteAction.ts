import * as allRoutes from "../constants/appRoutes";
import { Path as PathParser } from "path-parser";
import { AppStoreActions } from "../redux/services/app/actions";
import QueryString from "qs";

/*
 * Volatile paths; path's that shouldn't be remembered when the back
 * action is triggered
 */
const volatilePaths: string[] = [];

const activeWindows: { [k: string]: Window | null } = {};

export class RouteAction {
    private static getRouteQueryString(queryStrings: { [k: string]: string | undefined }) {
        let qs = "";

        Object.keys(queryStrings).forEach((key) => {
            if (queryStrings[key]) {
                const value = encodeURIComponent(queryStrings[key]!);
                qs = `${qs}${qs.length > 0 ? "&" : ""}${key}=${value}`;
            }
        });

        if (qs.length > 0) {
            return `?${qs}`;
        }
        return "";
    }

    private static formatRoutePath(pathName: string, pathParams?: { [k: string]: string }) {
        pathParams = pathParams || {};

        Object.keys(pathParams).forEach((key) => {
            if (pathParams![key]) {
                const re = RegExp(`/:${key}`);
                pathName = pathName.replace(re, `/${pathParams![key]}`);
            }
        });

        return pathName;
    }

    static gotoHome(): void {
        RouteAction.goto(allRoutes.HOME_ROUTE);
    }

    static gotoLogin(redirectTo?: string): void {
        RouteAction.goto(allRoutes.LOGIN_ROUTE, undefined, undefined, { redirect: redirectTo });
    }

    static gotoLogout(): void {
        RouteAction.goto(allRoutes.LOGOUT_ROUTE);
    }

    static getSingleApplicationRoute(applicationId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_APPLICATION_ROUTE, { applicationId });
    }

    static getSingleTenantRoute(tenantId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_ROUTE, { tenantId });
    }

    static getSingleTenantOverviewRoute(tenantId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_OVERVIEW_ROUTE, { tenantId });
    }

    static getSingleApplicationDetailsRoute(applicationId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_APPLICATION_DETAILS_ROUTE, { applicationId });
    }

    static getSingleApplicationPhotosRoute(applicationId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_APPLICATION_PHOTOS_ROUTE, { applicationId });
    }

    static getSingleCustomerRoute(customerId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_CUSTOMER_ROUTE, { customerId });
    }

    static getSingleCustomerOverviewRoute(customerId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_CUSTOMER_OVERVIEW_ROUTE, { customerId });
    }

    static getSingleApplicationDocsRoute(applicationId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_APPLICATION_DOCUMENTS_ROUTE, { applicationId });
    }

    static getSingleTenantDevicesRoute(tenantId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_DEVICES_ROUTE, { tenantId });
    }

    static getSingleTenantFrontendAppRoute(tenantId: string, applicationId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_FRONTEND_APPLICATION_ROUTE, { tenantId, applicationId });
    }

    static gotoSingleTenantFrontendAppRoute(tenantId: string, applicationId: string) {
        const route = RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_FRONTEND_APPLICATION_ROUTE, { tenantId, applicationId });
        RouteAction.goto(route);
    }

    static getSingleTenantUsersRoute(tenantId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_USERS_ROUTE, { tenantId });
    }

    static getSingleTenantAppsRoute(tenantId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_APPLICATIONS_ROUTE, { tenantId });
    }

    static getSingleTenantAPIAccessRoute(tenantId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_TENANT_API_KEYS_ROUTE, { tenantId });
    }

    static gotoSingleTenantRoute(tenantId: string) {
        RouteAction.goto(RouteAction.getSingleTenantRoute(tenantId));
    }

    //
    static getSingleCustomerDevicesRoute(customerId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_CUSTOMER_DEVICES_ROUTE, { customerId });
    }

    static getSingleCustomerUsersRoute(customerId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_CUSTOMER_USERS_ROUTE, { customerId });
    }

    static getSingleCustomerApplicationRoute(customerId: string) {
        return RouteAction.formatRoutePath(allRoutes.SINGLE_CUSTOMER_APPLICATION_ROUTE, { customerId });
    }

    static gotoSingleCustomerRoute(customerId: string) {
        RouteAction.goto(RouteAction.getSingleCustomerRoute(customerId));
    }
    //

    static gotoSingleCustomerApplicationRoute(applicationId: string) {
        RouteAction.goto(RouteAction.getSingleApplicationRoute(applicationId));
    }

    static gotoAllCustomers(): void {
        RouteAction.goto(allRoutes.CUSTOMERS_ROUTE);
    }

    static gotoAllTenants(): void {
        RouteAction.goto(allRoutes.TENANTS_ROUTE);
    }

    static gotoAllCustomerApplications(): void {
        RouteAction.goto(allRoutes.APPLICATIONS_ROUTE);
    }

    static canGoBack() {
        return AppStoreActions.getHistory()?.action !== "POP";
    }

    static goBack(preferedBackCall?: () => void): void {
        if (RouteAction.canGoBack()) {
            AppStoreActions.getHistory()?.goBack();
        } else if (preferedBackCall) {
            preferedBackCall();
        } else {
            RouteAction.gotoHome();
        }
    }

    static goto(route: string, routeParams?: { [k: string]: string }, state?: any, qStrings?: { [k: string]: string | undefined }): void {
        const oldPath = AppStoreActions.getHistory()?.location.pathname || "";
        const currentPathname = RouteAction.formatRoutePath(route, routeParams);
        const search = RouteAction.getRouteQueryString(qStrings || {});
        if (volatilePaths.includes(oldPath)) {
            AppStoreActions.getHistory()?.replace({ pathname: currentPathname, state, search } as { pathname: string; state: any });
        } else {
            AppStoreActions.getHistory()?.push({ pathname: currentPathname, state, search } as { pathname: string; state: any });
        }
    }

    static removeQueryPaths() {
        // TODO: Remove it here
        console.log("REMOVING QUERY PATHS FROM ", RouteAction.CURRENT_PATHNAME);
    }

    static get CURRENT_ROUTE(): string {
        const { pathname } = AppStoreActions.getHistory()!.location;
        return Object.values(allRoutes).find((t) => new PathParser(t).test(pathname)) || "";
    }

    static get CURRENT_PATHNAME(): string {
        return AppStoreActions.getHistory()!.location.pathname;
    }

    static get CURRENT_QUERY_STRINGS(): { [k: string]: string } {
        const search = AppStoreActions.getHistory()?.location.search || "";
        return QueryString.parse(search.substring(1) || {}) as { [k: string]: string };
    }
}
