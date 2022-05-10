import React from "react";
// import Loadable from "react-loadable";
import DashboardPage from "./Dashboard/Dashboard";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
    APPLICATIONS_ROUTE,
    CUSTOMERS_ROUTE,
    DASHBOARD_ROUTE,
    DEVICES_ROUTE,
    SETTINGS_ROUTE,
    SINGLE_APPLICATION_ROUTE,
    SINGLE_CUSTOMER_ROUTE,
    SINGLE_TENANT_ROUTE,
    TENANTS_ROUTE,
} from "../../constants/appRoutes";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ComingSoonPage from "./ComingSoonPage";
import CustomersPage from "./Customers/Customers";
import TenantsPage from "./Tenants/Tenants";
import DevicesPage from "./Devices/Devices";
import CustomerApplicationsPage from "./CustomerApplications/CustomerApplications";
import { SingleApplicationBlade } from "./CustomerApplications/SingleApplication/SingleApplicationBlade";
import { SingleTenantBlade } from "./Tenants/SingleTenant/SingleTenantBlade";
import { SingleCustomerBlade } from "./Customers/SingleCustomer/SingleCustomerBlade";

// const PageInitializing: React.FC<{ text?: string }> = ({ text }) => {
//     return <MainLayout Content={<Loading text={text || "Initializing"} />} />;
// };

// const DashboardPage = Loadable({
//     loader: () => import("./Dashboard/Dashboard"),
//     loading: () => <PageInitializing text="Initializing Dashboard Page" />,
// });

const ProtectedRoutes = () => {
    const location = useLocation();
    return (
        <Switch location={location}>
            <Route path={SINGLE_TENANT_ROUTE} component={() => <SingleTenantBlade />} />
            <Route path={SINGLE_APPLICATION_ROUTE} component={() => <SingleApplicationBlade />} />
            <Route path={SINGLE_CUSTOMER_ROUTE} component={() => <SingleCustomerBlade />} />
            <MainLayout darkSidebar>
                <Switch location={location}>
                    <Route path={DASHBOARD_ROUTE} component={() => <ComingSoonPage page="Dashboard" />} />
                    <Route path={DEVICES_ROUTE} component={() => <DevicesPage />} />
                    <Route path={TENANTS_ROUTE} component={() => <TenantsPage />} />
                    <Route path={CUSTOMERS_ROUTE} component={() => <CustomersPage />} />
                    <Route path={APPLICATIONS_ROUTE} component={() => <CustomerApplicationsPage />} />
                    <Route path={SETTINGS_ROUTE} component={() => <ComingSoonPage page="Settings" />} />
                    <Redirect to={DASHBOARD_ROUTE} push />
                </Switch>
            </MainLayout>
        </Switch>
    );
};

export default ProtectedRoutes;
