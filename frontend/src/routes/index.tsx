import React from "react";
import { HashRouter as Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
import ProtectedScreenHome from "../pages/Protected";
import { HOME_ROUTE, LOGOUT_ROUTE, LOGIN_ROUTE } from "../constants/appRoutes";
import RouteComponentHOC from "./routeHelpers/RouteComponent";
import LoginPage from "../pages/Authentication/Login/Login";
import RequiresAuth from "./routeHelpers/RequiresAuth";
import RequiresNoAuth from "./routeHelpers/RequiresNoAuth";
import LogoutPage from "../pages/Authentication/Logout/Logout";
import { AppStoreActions } from "../redux/services/app/actions";

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
                <Route path={HOME_ROUTE} component={RequiresAuth(ProtectedScreenHome)} />
                <Route path={LOGIN_ROUTE} component={RequiresNoAuth(LoginPage)} />
                <Route path={LOGOUT_ROUTE} component={RouteComponentHOC(LogoutPage)} />
                <Redirect to={HOME_ROUTE} push />
            </Switch>
        </Router>
    );
};

export default AppRoutes;
