import { Button, Card, message, notification, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteAction } from "../../../../actions/RouteAction";
import AppContent from "../../../../containers/AppContent/AppContent";
import { ICustomer, ICustomerDetails } from "../../../../models/Customer/Customer";
import { RootState } from "../../../../redux/reducers";

export const CustomerOverviewView: React.FC<{ customerId: string }> = ({ customerId }) => {
    const customers = useSelector<RootState, ICustomer[]>((r) => r.customer.customers);
    const customerDetails = useSelector<RootState, ICustomerDetails | undefined>((r) => r.customer.loadedCustomers[customerId]);
    const [customer, setCustomer] = useState<ICustomer>();

    useEffect(() => {
        const tn = customers.find((t) => t._id === customerId);
        if (tn) setCustomer(tn);
    }, [customers]);

    useEffect(() => {
        if (customerDetails) setCustomer(customerDetails.customer);
    }, [customerDetails]);

    return (
        <AppContent header="Overview">
            <Card>
                <Table
                    dataSource={[
                        { label: "First Name", value: customer?.firstName },
                        { label: "Last Name", value: customer?.lastName },
                        { label: "Email", value: customer?.email },
                        { label: "Telephone", value: customer?.telephone },
                        { label: "Address", value: customer?.address },
                        { label: "Registered Devices", value: customerDetails?.devices.length || "N/A", meta: "devices", customerId: customer?._id },
                        { label: "Registered Tenants", value: customerDetails?.tenants.length || "N/A", meta: "tenants", customerId: customer?._id },
                        { label: "Created On", value: moment(customer?.createdAt).format("ddd DD MMM, YYYY") },
                    ]}
                    showHeader={false}
                    pagination={false}
                    columns={[
                        { title: "", dataIndex: "label", width: 250 },
                        {
                            title: "",
                            dataIndex: "value",
                            render: (_, rec) =>
                                rec.meta === "devices" ? (
                                    <a href={`#${RouteAction.getSingleCustomerDevicesRoute(`${rec.customerId}`)}`}>{rec.value}</a>
                                ) : rec.meta === "tenants" ? (
                                    <a href={`#${RouteAction.getSingleCustomerDevicesRoute(`${rec.customerId}`)}`}>{rec.value}</a>
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
