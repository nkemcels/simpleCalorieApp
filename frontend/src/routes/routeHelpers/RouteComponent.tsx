import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppStoreActions } from "../../redux/services/app/actions";

/**
 * This HOC is used to perform certain actions before the route component is rendered
 * such as saving the component's current route state.
 * @param Component
 */
function RouteComponentHOC<CompPropT>(Component: React.ComponentType) {
    const WrappedComp: React.FC<CompPropT> = (props: CompPropT) => {
        const history = useHistory();
        useEffect(() => {
            AppStoreActions.saveRouterHistory(history);
        }, [history]);
        return <Component {...props} />;
    };

    return WrappedComp;
}

export default RouteComponentHOC;
