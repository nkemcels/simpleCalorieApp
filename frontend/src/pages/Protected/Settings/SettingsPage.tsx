import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { SETTINGS_ROUTE } from "../../../constants/appRoutes";
import MainLayout from "../../../layouts/MainLayout/MainLayout";
import GeneralSettingsPage from "./GeneralSettingsPage/GeneralSettingsPage";

const ServicesFees = () => {
    return (
        <Switch>
            <Route exact path={SETTINGS_ROUTE} component={() => <MainLayout Content={<GeneralSettingsPage />} />} />
            <Redirect to={SETTINGS_ROUTE} push />
        </Switch>
    );
};

export default ServicesFees;
