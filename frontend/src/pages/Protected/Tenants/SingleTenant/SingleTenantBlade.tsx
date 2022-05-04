import { ApiOutlined, DashboardOutlined, DatabaseOutlined, LaptopOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Card, Tag, notification, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { RouteAction } from "../../../../actions/RouteAction";
import { TenantAction } from "../../../../actions/TenantAction";
import {
    SINGLE_TENANT_API_KEYS_ROUTE,
    SINGLE_TENANT_APPLICATIONS_ROUTE,
    SINGLE_TENANT_DEVICES_ROUTE,
    SINGLE_TENANT_FRONTEND_APPLICATION_ROUTE,
    SINGLE_TENANT_OVERVIEW_ROUTE,
    SINGLE_TENANT_USERS_ROUTE,
} from "../../../../constants/appRoutes";
import AppContent from "../../../../containers/AppContent/AppContent";
import MainOptionsLayout from "../../../../layouts/MainLayout/MainOptionsLayout";
import { IDevice } from "../../../../models/Device/Device";
import { ITenant, ITenantDetails } from "../../../../models/Tenant/Tenant";
import { RootState } from "../../../../redux/reducers";
import TenantFrontendApp from "./FrontendApplicationView";
import { TenantAPIManagementView } from "./TenantAPIManagementView";
import { TenantApplicationsView } from "./TenantApplicationsView";
import { TenantOverviewView } from "./TenantOverviewView";

const TenantDevicesView: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const tenantDetails = useSelector<RootState, ITenantDetails | undefined>((r) => r.tenant.loadedTenants[tenantId]);
    const [devices, setDevices] = useState<IDevice[]>([]);

    useEffect(() => {
        setDevices(tenantDetails?.devices || []);
    }, [tenantDetails]);

    return (
        <AppContent header={`Devices (${devices.length})`}>
            {devices.map((t) => (
                <Card key={t._id} style={{ marginBottom: 20 }}>
                    {t.name}
                </Card>
            ))}
        </AppContent>
    );
};

const TenantUsersView: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const tenantDetails = useSelector<RootState, ITenantDetails | undefined>((r) => r.tenant.loadedTenants[tenantId]);
    const [devices, setDevices] = useState<IDevice[]>([]);

    useEffect(() => {
        setDevices(tenantDetails?.devices || []);
    }, [tenantDetails]);

    return (
        <AppContent header={`Devices (${devices.length})`}>
            <Card>Users here</Card>
        </AppContent>
    );
};

export const SingleTenantBlade = () => {
    const match = useRouteMatch();
    const tenantId = (match.params as any).tenantId;
    const tenantDetails = useSelector<RootState, ITenantDetails | undefined>((r) => r.tenant.loadedTenants[tenantId]);
    const [loading, setLoading] = useState(false);

    const handleLoadTenant = async () => {
        try {
            setLoading(true);
            TenantAction.loadTenantDetails(tenantId);
        } catch (error) {
            notification.error({ message: "Failed to load tenant", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadTenant();
    }, []);

    const handleGoBack = () => RouteAction.gotoAllTenants();

    return (
        <MainOptionsLayout
            sidebarProps={{
                header: (
                    <span>
                        {tenantDetails?.tenant.name}
                        <div style={{ marginLeft: 30, fontSize: 11, color: "#bbb", position: "relative", top: -2 }}>Tenant</div>
                    </span>
                ),
                onBack: handleGoBack,
                menuItems: [
                    {
                        label: "Overview",
                        route: RouteAction.getSingleTenantOverviewRoute(tenantId),
                        key: "overview",
                        icon: <DashboardOutlined />,
                    },
                    {
                        label: "Devices",
                        icon: <DatabaseOutlined />,
                        route: RouteAction.getSingleTenantDevicesRoute(tenantId),
                        key: "devices",
                    },
                    {
                        label: "Users",
                        icon: <UsergroupAddOutlined />,
                        route: RouteAction.getSingleTenantUsersRoute(tenantId),
                        key: "users",
                    },
                    {
                        label: "Apps & API Access",
                        icon: <LaptopOutlined />,
                        route: RouteAction.getSingleTenantAppsRoute(tenantId),
                        key: "apps",
                    },
                    // {
                    //     label: "API Access",
                    //     route: RouteAction.getSingleTenantAPIAccessRoute(tenantId),
                    //     icon: <ApiOutlined />,
                    //     key: "api_access",
                    // },
                ],
            }}
        >
            <Switch>
                <Route path={SINGLE_TENANT_FRONTEND_APPLICATION_ROUTE} component={() => <TenantFrontendApp tenantId={tenantId} />} />
                <Route path={SINGLE_TENANT_OVERVIEW_ROUTE} component={() => <TenantOverviewView tenantId={tenantId} />} />
                <Route path={SINGLE_TENANT_DEVICES_ROUTE} component={() => <TenantDevicesView tenantId={tenantId} />} />
                <Route path={SINGLE_TENANT_USERS_ROUTE} component={() => <TenantUsersView tenantId={tenantId} />} />
                <Route path={SINGLE_TENANT_APPLICATIONS_ROUTE} component={() => <TenantApplicationsView tenantId={tenantId} />} />
                <Route path={SINGLE_TENANT_API_KEYS_ROUTE} component={() => <TenantAPIManagementView tenantId={tenantId} />} />
                <Redirect to={SINGLE_TENANT_OVERVIEW_ROUTE} push />
            </Switch>
        </MainOptionsLayout>
    );
};
