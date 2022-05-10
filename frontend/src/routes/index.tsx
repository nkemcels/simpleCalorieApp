import React from "react";
import { HashRouter as Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
import { AUTH_ROUTES, HOME_ROUTES } from "../constants/appRoutes";
import RequiresAuth from "./routeHelpers/RequiresAuth";
import RequiresNoAuth from "./routeHelpers/RequiresNoAuth";
import { AppStoreActions } from "../redux/services/app/actions";
import AuthRoutes from "../pages/Authentication";
import ProtectedRoutes from "../pages/Protected";

/**
 * Synchronizes the current route path/state with the store
 */
const GlobalRouterProvider = () => {
    const history = useHistory();
    AppStoreActions.saveRouterHistory(history);
    return <></>;
};

/**
 * Defines the main entry points/routes into the app
 */
const AppRoutes = () => {
    return (
        <Router>
            <GlobalRouterProvider />
            <Switch>
                <Route path={HOME_ROUTES} component={RequiresAuth(ProtectedRoutes)} />
                <Route path={AUTH_ROUTES} component={RequiresNoAuth(AuthRoutes)} />
                <Redirect to={HOME_ROUTES} push />
            </Switch>
        </Router>
    );
};

export default AppRoutes;
