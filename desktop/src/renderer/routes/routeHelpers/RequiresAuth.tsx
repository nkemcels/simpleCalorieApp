import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { RootState } from "../../redux/reducers";
import { AppStoreActions } from "../../redux/services/app/actions";
import BasicHeaderLayout from "../../layouts/BasicHeaderLayout/BasicHeaderLayout";
import { notification } from "antd";
import { RouteAction } from "../../actions/RouteAction";
import { AuthAction } from "../../actions/AuthAction";

const LoadingPage = () => (
    <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Loading />
        </div>
    </div>
);
const PageError: React.FC<{ error: string }> = ({ error }) => (
    <BasicHeaderLayout
        title="Error"
        content={
            <h2 style={{ padding: 20 }}>
                <div>page load error</div>
                <div style={{ color: "#b71c1c" }}>{error}</div>
            </h2>
        }
    />
);

export default (Component: React.FunctionComponent) => {
    const ComponentWithRouter = withRouter(Component);
    return () => {
        const [pageLoadError, setPageLoadError] = useState<string>();
        const isAuthenticated = useSelector<RootState, boolean>((state) => state.auth.isAuthenticated);
        const history = useHistory();

        useEffect(() => {
            AppStoreActions.saveRouterHistory(history);
        }, [history]);

        useEffect(() => {
            if (!isAuthenticated) {
                AuthAction.attemptUserReAuthentication((err, isFailedAuth) => {
                    if (err && isFailedAuth) {
                        RouteAction.gotoLogin(history.location.pathname);
                    } else if (err) {
                        notification.error({ message: `${err}` });
                        setPageLoadError(err);
                    }
                });
            }
        }, [isAuthenticated]);
        return isAuthenticated ? <ComponentWithRouter /> : pageLoadError ? <PageError error={pageLoadError} /> : <LoadingPage />;
    };
};
