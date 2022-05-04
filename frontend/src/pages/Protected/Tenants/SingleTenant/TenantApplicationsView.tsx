import { CheckOutlined, CopyFilled, DeleteOutlined, EditOutlined, LaptopOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Modal, notification, Table, Tag } from "antd";
import moment from "moment";
import copyText from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteAction } from "../../../../actions/RouteAction";
import AppContent from "../../../../containers/AppContent/AppContent";
import { ITenant, ITenantDetails, TTenantApplicationType } from "../../../../models/Tenant/Tenant";
import { RootState } from "../../../../redux/reducers";
import MenuPopover from "../../../../components/MenuPopover/MenuPopover";
import { TenantAction } from "../../../../actions/TenantAction";
import { TenantAPIManagementView } from "./TenantAPIManagementView";
import { Link } from "react-router-dom";

const NewApplicationView: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const [option, setOption] = useState<TTenantApplicationType>();
    const [loading, setLoading] = useState(false);
    const [appName, setAppName] = useState<string>("");
    const handleCreateApplication = async (close = () => {}) => {
        try {
            setLoading(true);
            await TenantAction.addNewApplication(tenantId, appName.trim(), option!);
            message.success("New application successfully added");
            close();
        } catch (error) {
            notification.error({ message: "Failed to create application", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };
    return (
        <MenuPopover
            menuTitle="Select the application type"
            renderOptionView={(option, close) => (
                <div style={{ padding: 20 }}>
                    <div>App Name</div>
                    <Input placeholder="Enter Application Name" onChange={(e) => setAppName(e.target.value)} />
                    <div style={{ marginTop: 20, textAlign: "right" }}>
                        <Button
                            disabled={!appName?.trim() || loading}
                            loading={loading}
                            icon={<CheckOutlined />}
                            type="primary"
                            onClick={() => handleCreateApplication(close)}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            )}
            onSelectOption={(opt) => setOption(opt.value as TTenantApplicationType)}
            options={[
                {
                    label: "Device-to-Backend",
                    desc: "This application allows the pi/device to access the system",
                    value: "device",
                    type: "component",
                },
                {
                    label: "Backend-to-Backend",
                    desc: "Enables MyGYM to customer backend communications",
                    value: "backend",
                    type: "component",
                },
                { label: "Frontend", desc: "Allows customer frontends to signup users", value: "frontend", type: "component" },
            ]}
        >
            <Button type="primary" icon={<PlusOutlined />}>
                Add Application
            </Button>
        </MenuPopover>
    );
};

export const TenantApplicationsView: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const tenantDetails = useSelector<RootState, ITenantDetails | undefined>((r) => r.tenant.loadedTenants[tenantId]);
    const [applications, setApplications] = useState<ITenant["applications"]>([]);
    const [deletingApp, setDeletingApp] = useState<string>();
    const handleCopyText = (key: string) => {
        copyText(key);
        message.info("Text copied!");
    };

    const handleDelete = (appId: string) => {
        const deleteAction = async () => {
            try {
                setDeletingApp(appId);
                await TenantAction.deleteApplication(tenantId, appId);
                message.success("App deleted!");
            } catch (error) {
                notification.error({ message: "Failed to delete app", description: `${error}` });
            } finally {
                setDeletingApp(undefined);
            }
        };
        Modal.confirm({
            title: "Confirm Delete",
            content: "Are you sure you want to delete this application? Action can't be undone",
            onOk: deleteAction,
            okText: "YES, DELETE",
            okButtonProps: { danger: true },
        });
    };

    const handleGotoAppDetails = (app: ITenant["applications"][number]) => {
        switch (app.appType) {
            case "frontend":
                return RouteAction.gotoSingleTenantFrontendAppRoute(tenantId, app._id);
        }
    };

    useEffect(() => {
        if (tenantDetails) setApplications(tenantDetails.tenant.applications);
    }, [tenantDetails]);

    return (
        <AppContent header="Applications" headerActions={<NewApplicationView tenantId={tenantId} />}>
            <Card>
                <Table
                    dataSource={applications}
                    pagination={false}
                    columns={[
                        {
                            title: "App Name",
                            render: (_, rec) => (
                                <Link to={rec.appType === "frontend" ? RouteAction.getSingleTenantFrontendAppRoute(tenantId, rec._id) : ""}>
                                    <LaptopOutlined /> {rec.name}
                                </Link>
                            ),
                        },
                        {
                            title: "Type",
                            render: (_, rec) => {
                                return rec.appType === "backend" ? (
                                    <Tag color="magenta">Backend</Tag>
                                ) : rec.appType === "device" ? (
                                    <Tag color={"green"}>Device</Tag>
                                ) : rec.appType === "frontend" ? (
                                    <Tag color="blue">Frontend</Tag>
                                ) : (
                                    rec.appType
                                );
                            },
                        },
                        {
                            title: "App ID",
                            dataIndex: "value",
                            render: (_, rec) => (
                                <span style={{ display: "flex", alignItems: "center", fontFamily: "monospace" }}>
                                    {rec.appId}
                                    <Button size="small" icon={<CopyFilled />} style={{ marginLeft: 10 }} onClick={() => handleCopyText(rec.appId)} />
                                </span>
                            ),
                        },
                        {
                            width: 170,
                            render: (_, rec) => (
                                <>
                                    <Button size="small" icon={<EditOutlined />} onClick={() => handleGotoAppDetails(rec)}>
                                        manage
                                    </Button>
                                    <Button
                                        size="small"
                                        danger
                                        style={{ marginLeft: 10 }}
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(rec._id)}
                                        disabled={deletingApp === rec._id}
                                        loading={deletingApp === rec._id}
                                    ></Button>
                                </>
                            ),
                        },
                    ]}
                />
            </Card>
            <h2 style={{ marginTop: 50 }}>API Access</h2>
            <Card>
                <TenantAPIManagementView tenantId={tenantId} />
            </Card>

            <h2 style={{ marginTop: 50 }}>Code samples</h2>
            <Card>code samples tab here</Card>
            {/* <Card style={{ marginTop: 35 }}>more details</Card> */}
        </AppContent>
    );
};
