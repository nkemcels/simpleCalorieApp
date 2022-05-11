import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { AnimatedSwitchWrapper } from "../../components/AnimatedSwitch/AnimatedSwitch";
import { LOGIN_ROUTE, LOGOUT_ROUTE, SIGNUP_ROUTE } from "../../constants/appRoutes";
import SimpleCenteredLayout from "../../layouts/SimpleLayout/SimpleCenteredLayout";
import RequiresNoAuth from "../../routes/routeHelpers/RequiresNoAuth";
import LoginPage from "./Login/Login";
import LogoutPage from "./Logout/Logout";
import SignupPage from "./Signup/Signup";

const AuthRoutes = () => {
    return (
        <SimpleCenteredLayout>
            <Switch>
                <Route
                    path={SIGNUP_ROUTE}
                    component={RequiresNoAuth(() => (
                        <SignupPage />
                    ))}
                    exact
                />
                <Route
                    path={LOGIN_ROUTE}
                    component={RequiresNoAuth(() => (
                        <LoginPage />
                    ))}
                    exact
                />
                <Route path={LOGOUT_ROUTE} component={() => <LogoutPage />} exact />
                <Redirect to={LOGIN_ROUTE} push />
            </Switch>
        </SimpleCenteredLayout>
    );
};

export default AuthRoutes;
