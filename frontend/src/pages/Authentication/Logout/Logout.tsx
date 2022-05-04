import React, { useEffect } from "react";
import { AuthAction } from "../../../actions/AuthAction";
import { RouteAction } from "../../../actions/RouteAction";
import AppLoadingPage from "../../AppLoadingPage/AppLoadingPage";

const LogoutPage = () => {
    useEffect(() => {
        AuthAction.dispatchLogout();
        setTimeout(RouteAction.gotoLogin, 2000);
    }, []);
    return <AppLoadingPage loadingText="Logging out" />;
};

export default LogoutPage;
