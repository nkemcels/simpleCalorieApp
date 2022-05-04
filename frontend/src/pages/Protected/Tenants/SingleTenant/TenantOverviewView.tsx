import { UserOutlined } from "@ant-design/icons";
import { Button, Card, message, notification, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteAction } from "../../../../actions/RouteAction";
import AppContent from "../../../../containers/AppContent/AppContent";
import { ITenant, ITenantDetails } from "../../../../models/Tenant/Tenant";
import { RootState } from "../../../../redux/reducers";

export const TenantOverviewView: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const tenants = useSelector<RootState, ITenant[]>((r) => r.tenant.tenants);
    const tenantDetails = useSelector<RootState, ITenantDetails | undefined>((r) => r.tenant.loadedTenants[tenantId]);
    const [tenant, setTenant] = useState<ITenant>();

    useEffect(() => {
        const tn = tenants.find((t) => t._id === tenantId);
        if (tn) setTenant(tn);
    }, [tenants]);
    useEffect(() => {
        if (tenantDetails) setTenant(tenantDetails.tenant);
    }, [tenantDetails]);
    return (
        <AppContent header="Overview">
            <Card>
                <Table
                    dataSource={[
                        { label: "Tenant Name", value: tenant?.name, meta: "name" },
                        { label: "Tenant ID", value: tenant?.tenantId },
                        {
                            label: "Customer",
                            value: `${tenant?.customer.firstName} ${tenant?.customer.lastName}`,
                            meta: "customer",
                            customerId: tenant?.customer._id,
                        },
                        { label: "Registered Devices", value: tenantDetails?.devices.length || "N/A", meta: "devices" },
                        { label: "Created On", value: moment(tenant?.createdAt).format("ddd DD MMM, YYYY") },
                    ]}
                    showHeader={false}
                    pagination={false}
                    columns={[
                        { title: "", dataIndex: "label", width: 250 },
                        {
                            title: "",
                            dataIndex: "value",
                            render: (_, rec) =>
                                rec.meta == "customer" ? (
                                    <a>
                                        <UserOutlined /> {rec.value}
                                    </a>
                                ) : rec.meta === "devices" ? (
                                    <a href={`#${RouteAction.getSingleTenantDevicesRoute(tenantDetails?.tenant._id || "")}`}>{rec.value}</a>
                                ) : (
                                    rec.value
                                ),
                        },
                    ]}
                />
            </Card>
            {/* <Card style={{ marginTop: 35 }}>more details</Card> */}
        </AppContent>
    );
};
