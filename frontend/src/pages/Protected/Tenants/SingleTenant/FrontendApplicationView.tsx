import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Popover, Row, Select, Space, Tag } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import MenuPopover from "../../../../components/MenuPopover/MenuPopover";
import AppContent from "../../../../containers/AppContent/AppContent";
import { ITenant, ITenantDetails } from "../../../../models/Tenant/Tenant";
import { RootState } from "../../../../redux/reducers";
import Styles from "../Tenants.scss";

const defaultFields = [
    { id: 1, name: "firstName", label: "First Name", type: "string", default: "", required: false, isDefault: true },
    { id: 2, name: "lastName", label: "Last Name", type: "string", default: "", required: false, isDefault: true },
    { id: 3, name: "email", label: "Email", type: "email", default: "", required: false, isDefault: true },
    { id: 4, name: "age", label: "Age", type: "number", default: "", required: false, isDefault: true },
    {
        id: 4,
        name: "gender",
        label: "Gender",
        type: "menu",
        default: "",
        required: false,
        isDefault: true,
        options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
        ],
    },
];

const AddFieldPopover = () => {
    return (
        <MenuPopover
            menuTitle="Select field type"
            options={[
                { label: "String Field", value: "string", type: "component" },
                { label: "Integer Field", value: "int", type: "component" },
                { label: "Date Field", value: "date", type: "component" },
                { label: "Multi-Options Field", value: "menu", type: "component" },
            ]}
            renderOptionView={(option, close) => (
                <div style={{ padding: 20 }}>
                    <div>Field Name</div>
                    <Input placeholder="Enter Field Name" />
                    <div style={{ marginTop: 15 }}>Field Label</div>
                    <Input placeholder="Enter Display Label" />
                    {option === "menu" && (
                        <>
                            <div style={{ marginTop: 15 }}>Options</div>
                            <Input.TextArea placeholder="Enter options separated by a newline" rows={4} />
                        </>
                    )}
                    <div style={{ marginTop: 20, textAlign: "right" }}>
                        <Button type="primary" icon={<CheckOutlined />}>
                            Add Entry
                        </Button>
                    </div>
                </div>
            )}
        >
            <Button type="primary" icon={<PlusOutlined />}>
                Add Field
            </Button>
        </MenuPopover>
    );
};

const TenantFrontendApp: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const match = useRouteMatch();
    const applicationId = (match.params as any).applicationId;
    const tenantDetails = useSelector<RootState, ITenantDetails | undefined>((r) => r.tenant.loadedTenants[tenantId]);
    const [application, setApplication] = useState<ITenant["applications"][number]>();
    useEffect(() => {
        setApplication(tenantDetails?.tenant.applications.find((t) => t._id === applicationId));
    }, [tenantDetails]);
    return (
        <AppContent header="Application" subHeader={application?.name || "Not found"} headerActions={<Tag color="cyan">Frontend App</Tag>}>
            {!application ? (
                "Application not found"
            ) : (
                <Card className={Styles.FrontendAppContainer}>
                    <h2
                        style={{
                            borderBottom: "1px solid #eee",
                            paddingBottom: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>User Signup Form</span>
                        <span>
                            <AddFieldPopover />
                            <Button style={{ marginLeft: 10 }}>
                                Preview <ArrowRightOutlined rotate={-45} />
                            </Button>
                        </span>
                    </h2>
                    <div className={Styles.FormContainer}>
                        <Card className={classNames("container", Styles.FormContentCard)}>
                            <Row>
                                {defaultFields.map((t) => (
                                    <Col key={t.id} md={12} sm={24}>
                                        <div className={Styles.FormItem}>
                                            <div className={Styles.Label}>{t.label}</div>
                                            <div className={Styles.Value}>
                                                {t.type === "number" ? (
                                                    <InputNumber style={{ flex: 1, width: "100%" }} placeholder={t.name} />
                                                ) : t.type === "menu" ? (
                                                    <Select options={t.options} placeholder={t.name} />
                                                ) : t.type === "date" ? (
                                                    <DatePicker style={{ width: "100%" }} placeholder={t.name} />
                                                ) : (
                                                    <Input placeholder={t.name} />
                                                )}
                                            </div>
                                            <div className={Styles.Actions}>
                                                <Button
                                                    icon={<EditOutlined />}
                                                    style={{ marginRight: 7 }}
                                                    size="small"
                                                    shape="circle"
                                                    disabled={t.isDefault}
                                                />
                                                <Button icon={<DeleteOutlined />} size="small" shape="circle" danger disabled={t.isDefault} />
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </div>
                </Card>
            )}
        </AppContent>
    );
};

export default TenantFrontendApp;
