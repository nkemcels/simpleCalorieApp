import { ApartmentOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, notification, Popover, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteAction } from "../../../actions/RouteAction";
import { TenantAction } from "../../../actions/TenantAction";
import DataTable from "../../../components/Table/DataTable/DataTable";
import AppContent from "../../../containers/AppContent/AppContent";
import { ICustomer } from "../../../models/Customer/Customer";
import { ITenant } from "../../../models/Tenant/Tenant";
import { RootState } from "../../../redux/reducers";
import Styles from "./Tenants.scss";

const NewTenantViewAction = () => {
    const [customer, setCustomer] = useState("");
    const [tenantName, setTenantName] = useState("");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const customers = useSelector<RootState, ICustomer[]>((r) => r.customer.customers);

    const handleCreateTenant = async () => {
        try {
            setLoading(true);
            await TenantAction.addNewTenant({ name: tenantName, customer: customer as any });
            setVisible(false);
        } catch (error) {
            notification.error({ message: "Failed to create tenant", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Popover
            placement="bottomLeft"
            trigger={["click"]}
            visible={visible}
            onVisibleChange={setVisible}
            title={<h3>Add New Tenant</h3>}
            content={
                <div style={{ padding: 20 }}>
                    <div style={{ marginBottom: 15 }}>
                        <div>Customer</div>
                        <Select
                            placeholder="Select customer..."
                            value={customer}
                            onChange={setCustomer}
                            options={customers.map((t) => ({ label: `${t.firstName} ${t.lastName}`, value: t._id }))}
                        />
                    </div>
                    <div style={{ marginBottom: 25 }}>
                        <div>Tenant name</div>
                        <Input placeholder="Enter tenant name" value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <Button
                            icon={<PlusOutlined />}
                            loading={loading}
                            disabled={loading || !tenantName.trim() || !customer}
                            type="primary"
                            onClick={handleCreateTenant}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            }
        >
            <Button icon={<ApartmentOutlined />} type="primary">
                New Tenant
            </Button>
        </Popover>
    );
};

const TenantsPage = () => {
    const tenants = useSelector<RootState, ITenant[]>((r) => r.tenant.tenants);
    const [loading, setLoading] = useState(false);
    const handleLoadTenants = async () => {
        try {
            setLoading(true);
            await TenantAction.loadTenants();
        } catch (error) {
            notification.error({ message: "Failed to load tenants", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };
    const handleGotoSingleTenant = (tenantId: string) => {
        RouteAction.gotoSingleTenantRoute(tenantId);
    };
    useEffect(() => {
        handleLoadTenants();
    }, []);
    return (
        <AppContent header="Tenants" headerActions={<NewTenantViewAction />}>
            <Card className={Styles.CardContent}>
                <DataTable
                    dataSource={tenants}
                    loading={loading}
                    getColumns={() => [
                        {
                            title: "Tenant Name",
                            render: (_, rec) => (
                                <a onClick={() => handleGotoSingleTenant(rec._id)}>
                                    <ApartmentOutlined style={{ marginRight: 7 }} />
                                    {rec.name}
                                </a>
                            ),
                        },
                        { title: "Tenant ID", dataIndex: "tenantId" },
                        { title: "Customer", render: (_, rec) => `${rec.customer.firstName} ${rec.customer.lastName?.[0]}.` },
                        { title: "Created Date", render: (_, rec) => moment(rec.createdAt).format("DD MMM YYYY") },
                    ]}
                    filterPredicate={() => true}
                />
            </Card>
        </AppContent>
    );
};

export default TenantsPage;
