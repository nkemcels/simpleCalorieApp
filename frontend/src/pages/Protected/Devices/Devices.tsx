import { Card, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeviceAction } from "../../../actions/DeviceAction";
import DataTable from "../../../components/Table/DataTable/DataTable";
import AppContent from "../../../containers/AppContent/AppContent";
import { IDevice } from "../../../models/Device/Device";
import { RootState } from "../../../redux/reducers";
import Styles from "./Devices.scss";

const DevicesPage = () => {
    const devices = useSelector<RootState, IDevice[]>((r) => r.device.devices);
    const [loading, setLoading] = useState(false);

    const handleLoadDevices = async () => {
        try {
            setLoading(true);
            await DeviceAction.loadDevices();
        } catch (error) {
            notification.error({ message: "Failed to load devices", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadDevices();
    }, []);
    return (
        <AppContent header="Devices">
            <Card className={Styles.CardContent}>
                <DataTable
                    dataSource={devices}
                    loading={loading}
                    getColumns={() => [
                        { title: "Device Name", dataIndex: "name" },
                        { title: "Tenant", render: (_, rec) => `${rec.tenant.name}` },
                        { title: "Customer", render: (_, rec) => `${rec.tenant.customer.firstName} ${rec.tenant.customer.lastName?.[0]}.` },
                        { title: "Created Date", render: (_, rec) => moment(rec.createdAt).format("DD MMM YYYY") },
                    ]}
                    filterPredicate={() => true}
                />
            </Card>
        </AppContent>
    );
};

export default DevicesPage;
