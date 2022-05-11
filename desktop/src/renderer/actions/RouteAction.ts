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
    /**
     *
     * @param queryStrings
     * @returns
     */
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
        RouteAction.goto(allRoutes.HOME_ROUTES);
    }

    static gotoLogin(redirectTo?: string): void {
        RouteAction.goto(allRoutes.LOGIN_ROUTE, undefined, undefined, { redirect: redirectTo });
    }

    static gotoSignup(redirectTo?: string): void {
        RouteAction.goto(allRoutes.SIGNUP_ROUTE, undefined, undefined, { redirect: redirectTo });
    }

    static gotoLogout(): void {
        RouteAction.goto(allRoutes.LOGOUT_ROUTE);
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
