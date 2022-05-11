import React from "react";
// import Loadable from "react-loadable";
import { Redirect, Route, Switch } from "react-router-dom";
import { DASHBOARD_ROUTE } from "../../constants/appRoutes";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ComingSoonPage from "./ComingSoonPage";
import HomePage from "./Home/HomePage";

const ProtectedRoutes = () => {
    return (
        <MainLayout>
            <Switch>
                <Route path={DASHBOARD_ROUTE} component={() => <HomePage />} />
                <Redirect to={DASHBOARD_ROUTE} push />
            </Switch>
        </MainLayout>
    );
};

export default ProtectedRoutes;
