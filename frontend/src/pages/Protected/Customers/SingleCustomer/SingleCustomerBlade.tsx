import {
    ApartmentOutlined,
    ApiOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    FilePdfOutlined,
    LaptopOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag, notification, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { CustomerAction } from "../../../../actions/CustomerAction";
import { RouteAction } from "../../../../actions/RouteAction";
import {
    SINGLE_CUSTOMER_APPLICATION_ROUTE,
    SINGLE_CUSTOMER_DEVICES_ROUTE,
    SINGLE_CUSTOMER_OVERVIEW_ROUTE,
    SINGLE_CUSTOMER_USERS_ROUTE,
} from "../../../../constants/appRoutes";
import AppContent from "../../../../containers/AppContent/AppContent";
import MainOptionsLayout from "../../../../layouts/MainLayout/MainOptionsLayout";
import { ICustomer, ICustomerDetails } from "../../../../models/Customer/Customer";
import { IDevice } from "../../../../models/Device/Device";
import { ITenant } from "../../../../models/Tenant/Tenant";
import { RootState } from "../../../../redux/reducers";
import { CustomerOverviewView } from "./CustomerOverviewView";

const CustomerDevicesView: React.FC<{ customerId: string }> = ({ customerId }) => {
    const customerDetails = useSelector<RootState, ICustomerDetails | undefined>((r) => r.customer.loadedCustomers[customerId]);
    const [devices, setDevices] = useState<IDevice[]>([]);
    const [tenants, setTenants] = useState<ITenant[]>([]);

    useEffect(() => {
        setDevices(customerDetails?.devices || []);
        setTenants(customerDetails?.tenants || []);
    }, [customerDetails]);

    return (
        <AppContent header="">
            <h2 style={{ display: "flex", alignItems: "center" }}>
                <span>Devices</span> <Tag style={{ marginLeft: 10 }}>{devices.length}</Tag>
            </h2>
            <Card>
                <Table
                    dataSource={devices}
                    columns={[
                        { dataIndex: "name", title: "Name" },
                        {
                            title: "Tenant",
                            render: (_, rec) => (
                                <Link to={RouteAction.getSingleTenantRoute(rec.tenant._id)}>
                                    <ApartmentOutlined style={{ marginRight: 5 }} /> {rec.tenant.name}
                                </Link>
                            ),
                        },
                        { title: "Date Created", render: (_, rec) => moment(rec.createdAt).format("DD MMM, YYYY") },
                    ]}
                />
            </Card>

            <h2 style={{ marginTop: 65, display: "flex", alignItems: "center" }}>
                <span>Tenants</span> <Tag style={{ marginLeft: 10 }}>{tenants.length}</Tag>
            </h2>
            <Card>
                <Table
                    dataSource={tenants}
                    columns={[
                        {
                            title: "Name",
                            render: (_, rec) => (
                                <Link to={RouteAction.getSingleTenantRoute(rec._id)}>
                                    <ApartmentOutlined style={{ marginRight: 5 }} /> {rec.name}
                                </Link>
                            ),
                        },
                        { title: "Date Created", render: (_, rec) => moment(rec.createdAt).format("DD MMM, YYYY") },
                    ]}
                />
            </Card>
        </AppContent>
    );
};

const CustomerUsersView: React.FC<{ customerId: string }> = ({ customerId }) => {
    const customerDetails = useSelector<RootState, ICustomerDetails | undefined>((r) => r.customer.loadedCustomers[customerId]);
    const [users, setUsers] = useState<IDevice[]>([]);

    useEffect(() => {
        setUsers(customerDetails?.devices || []);
    }, [customerDetails]);

    return (
        <AppContent header={`Users (${users.length})`}>
            <Card>Users here</Card>
        </AppContent>
    );
};

export const SingleCustomerBlade = () => {
    const match = useRouteMatch();
    const customerId = (match.params as any).customerId;
    const customerDetails = useSelector<RootState, ICustomerDetails | undefined>((r) => r.customer.loadedCustomers[customerId]);
    const [loading, setLoading] = useState(false);
    const handleLoadCustomer = async () => {
        try {
            setLoading(true);
            CustomerAction.loadCustomerDetails(customerId);
        } catch (error) {
            notification.error({ message: "Failed to load customer", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadCustomer();
    }, []);

    const handleGoBack = () => RouteAction.gotoAllCustomers();

    return (
        <MainOptionsLayout
            sidebarProps={{
                header: (
                    <span>
                        {customerDetails?.customer.firstName} {customerDetails?.customer.lastName?.[0]}.
                        <div style={{ marginLeft: 30, fontSize: 11, color: "#bbb", position: "relative", top: -2 }}>Customer</div>
                    </span>
                ),
                onBack: handleGoBack,
                menuItems: [
                    {
                        label: "Overview",
                        icon: <DashboardOutlined />,
                        route: RouteAction.getSingleCustomerOverviewRoute(customerId),
                        key: "overview",
                    },
                    {
                        label: "Devices & Tenants",
                        icon: <DatabaseOutlined />,
                        route: RouteAction.getSingleCustomerDevicesRoute(customerId),
                        key: "devices",
                    },
                    {
                        label: "Users",
                        icon: <UsergroupAddOutlined />,
                        route: RouteAction.getSingleCustomerUsersRoute(customerId),
                        key: "users",
                    },
                    // {
                    //     label: "Application",
                    //     icon: <FilePdfOutlined />,
                    //     route: RouteAction.getSingleCustomerApplicationRoute(customerId),
                    //     key: "apps",
                    // },
                ],
            }}
        >
            <Switch>
                <Route path={SINGLE_CUSTOMER_OVERVIEW_ROUTE} component={() => <CustomerOverviewView customerId={customerId} />} />
                <Route path={SINGLE_CUSTOMER_DEVICES_ROUTE} component={() => <CustomerDevicesView customerId={customerId} />} />
                <Route path={SINGLE_CUSTOMER_USERS_ROUTE} component={() => <CustomerUsersView customerId={customerId} />} />
                <Route path={SINGLE_CUSTOMER_APPLICATION_ROUTE} component={() => null} />
                <Redirect to={SINGLE_CUSTOMER_OVERVIEW_ROUTE} push />
            </Switch>
        </MainOptionsLayout>
    );
};
