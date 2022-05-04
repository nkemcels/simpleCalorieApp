import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Card, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomerAction } from "../../../actions/CustomerAction";
import { RouteAction } from "../../../actions/RouteAction";
import DataTable from "../../../components/Table/DataTable/DataTable";
import AppContent from "../../../containers/AppContent/AppContent";
import { ICustomer } from "../../../models/Customer/Customer";
import { RootState } from "../../../redux/reducers";
import Styles from "./Customers.scss";

const CustomersPage = () => {
    const customers = useSelector<RootState, ICustomer[]>((r) => r.customer.customers);
    const [loading, setLoading] = useState(false);

    const handleLoadCustomers = async () => {
        try {
            setLoading(true);
            await CustomerAction.loadCustomers();
        } catch (error) {
            notification.error({ message: "Failed to load customers", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadCustomers();
    }, []);
    return (
        <AppContent header="Customers">
            <Card className={Styles.CardContent}>
                <DataTable
                    dataSource={customers}
                    loading={loading}
                    getColumns={() => [
                        {
                            title: "Names",
                            render: (_, rec) => (
                                <Link to={RouteAction.getSingleCustomerRoute(rec._id)}>
                                    <UserOutlined /> {rec.firstName} {rec.lastName}
                                </Link>
                            ),
                        },
                        { title: "Email", dataIndex: "email" },
                        { title: "Telephone", dataIndex: "telephone" },
                    ]}
                    filterPredicate={() => true}
                />
            </Card>
        </AppContent>
    );
};

export default CustomersPage;
