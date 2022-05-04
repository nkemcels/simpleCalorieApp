import { SolutionOutlined } from "@ant-design/icons";
import { Card, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomerAction } from "../../../actions/CustomerAction";
import { RouteAction } from "../../../actions/RouteAction";
import { TenantAction } from "../../../actions/TenantAction";
import DataTable from "../../../components/Table/DataTable/DataTable";
import AppContent from "../../../containers/AppContent/AppContent";
import { ICustomerApplication } from "../../../models/Customer/Customer";
import { ITenant } from "../../../models/Tenant/Tenant";
import { RootState } from "../../../redux/reducers";
import Styles from "./CustomerApplications.scss";

const CustomerApplicationsPage = () => {
    const applications = useSelector<RootState, ICustomerApplication[]>((r) => r.customer.applications);
    const [loading, setLoading] = useState(false);

    const handleLoadApplications = async () => {
        try {
            setLoading(true);
            await CustomerAction.loadApplications();
        } catch (error) {
            notification.error({ message: "Failed to load applications", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    const handleRouteSingleApplication = (applicationId: string) => {
        RouteAction.gotoSingleCustomerApplicationRoute(applicationId);
    };

    useEffect(() => {
        handleLoadApplications();
    }, []);
    return (
        <AppContent header="Tenants">
            <Card className={Styles.CardContent}>
                <DataTable
                    dataSource={applications}
                    loading={loading}
                    getColumns={() => [
                        {
                            title: "Names",
                            render: (_, rec) => (
                                <a onClick={() => handleRouteSingleApplication(rec._id)}>
                                    <SolutionOutlined style={{ marginRight: 5 }} />
                                    {rec.firstName} {rec.lastName}
                                </a>
                            ),
                        },
                        { title: "Email", dataIndex: "email" },
                        { title: "Status", dataIndex: "applicationStatus" },
                        { title: "Submitted On", render: (_, rec) => moment(rec.createdAt).format("DD MMM YYYY") },
                    ]}
                    filterPredicate={() => true}
                />
            </Card>
        </AppContent>
    );
};

export default CustomerApplicationsPage;
