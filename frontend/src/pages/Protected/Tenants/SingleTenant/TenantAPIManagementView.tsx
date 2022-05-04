import { CheckOutlined, CopyFilled, DeleteOutlined, EyeFilled, EyeInvisibleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, message, Modal, notification, Popover, Radio, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import copyText from "copy-to-clipboard";
import AppContent from "../../../../containers/AppContent/AppContent";
import { ITenant, ITenantDetails } from "../../../../models/Tenant/Tenant";
import { RootState } from "../../../../redux/reducers";
import Styles from "../Tenants.scss";
import moment from "moment";
import { TenantAction } from "../../../../actions/TenantAction";
import prettyMs from "pretty-ms";

const NewKeyPopover: React.FC<{ tenantId: string }> = ({ children, tenantId }) => {
    const [option, setOption] = useState<string | number>(7);
    const [visible, setVisible] = useState(false);
    const [customDate, setCustomDate] = useState<moment.Moment | null>();
    const [generating, setGenerating] = useState(false);
    const handleGenerate = async () => {
        let date = "";
        try {
            if (typeof option === "number") {
                date = moment.utc().add(option, "days").endOf("day").toISOString();
            } else if (option === "custom" && customDate) {
                date = customDate.utc().toISOString();
            }
            if (!date && option !== "none") {
                return notification.error({ message: "Please set an expiration date for your key." });
            }

            setGenerating(true);
            await TenantAction.generateTenantAPIKey(tenantId, date || undefined);
            setVisible(false);
            message.success("New key generated");
        } catch (error) {
            notification.error({ message: "Failed to generate key", description: `${error}` });
        } finally {
            setGenerating(false);
        }
    };
    return (
        <Popover
            title={<h3>Generate new API key</h3>}
            trigger={["click"]}
            placement="left"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <div className={Styles.GenerateKeyContainer}>
                    <div>Expires After</div>
                    <div style={{ display: "flex", alignItems: "center", minWidth: 200 }}>
                        <Select
                            value={option}
                            onChange={setOption}
                            style={{ flex: 1 }}
                            options={[
                                { label: "3 days", value: 3 },
                                { label: "7 days", value: 7 },
                                { label: "30 days", value: 30 },
                                { label: "60 days", value: 60 },
                                { label: "90 days", value: 90 },
                                { label: "Custom...", value: "custom" },
                                { label: "No expiration", value: "none" },
                            ]}
                        />
                        {option === "custom" && (
                            <DatePicker
                                style={{ width: "100%", flex: 1, marginLeft: 10 }}
                                value={customDate}
                                onChange={(val) => setCustomDate(val)}
                            />
                        )}
                    </div>
                    <div style={{ marginTop: 30, paddingTop: 20, borderTop: "1px solid #ccc" }}>
                        <Button
                            loading={generating}
                            disabled={generating}
                            icon={<CheckOutlined />}
                            type="primary"
                            style={{ width: "100%" }}
                            onClick={handleGenerate}
                        >
                            Generate
                        </Button>
                    </div>
                </div>
            }
        >
            {children}
        </Popover>
    );
};

export const TenantAPIManagementView: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const tenantDetails = useSelector<RootState, ITenantDetails | undefined>((r) => r.tenant.loadedTenants[tenantId]);
    const [apiKeys, setAPIKeys] = useState<ITenant["apiKeys"]>([]);
    const [unmaskedKeys, setUnMaskedKeys] = useState<string[]>([]);
    const [deletingKey, setDeletingKey] = useState<string>();
    const handleToggleUnmaskKey = (key: string) => {
        setUnMaskedKeys((r) => (r.includes(key) ? r.filter((t) => t !== key) : [...r, key]));
    };

    const handleDeleteKey = async (keyId: string, isExpired = false) => {
        const deleteAction = async () => {
            try {
                setDeletingKey(keyId);
                await TenantAction.deleteTenantAPIKey(tenantId, keyId);
                message.info("Key deleted");
            } catch (error) {
                notification.error({ message: "Failed to delete key", description: `${error}` });
            } finally {
                setDeletingKey(undefined);
            }
        };
        if (!isExpired) {
            Modal.confirm({
                title: "Delete Confirmation",
                content: (
                    <div>
                        Are you sure you want to delete this API Key? All devices and applications using this key will no longer be able to access the
                        APIs.
                    </div>
                ),
                okText: "YES, DELETE",
                okButtonProps: { danger: true },
                onOk: deleteAction,
            });
        } else deleteAction();
    };

    const handleCopyText = (key: string) => {
        copyText(key);
        message.info("Text copied!");
    };

    useEffect(() => {
        if (tenantDetails) setAPIKeys(tenantDetails.tenant.apiKeys || []);
    }, [tenantDetails]);

    return (
        <>
            <Table
                size="small"
                pagination={false}
                dataSource={[{ id: tenantDetails?.tenant.tenantId }]}
                columns={[
                    {
                        title: "Tenant ID",
                        dataIndex: "id",
                        render: (_, rec) => (
                            <span style={{ fontFamily: "monospace" }}>
                                {rec.id}
                                <Button size="small" icon={<CopyFilled />} style={{ marginLeft: 20 }} onClick={() => handleCopyText(rec.id!)} />
                            </span>
                        ),
                    },
                ]}
            />

            <h3 style={{ marginTop: 65 }} />
            <Table
                size="small"
                pagination={false}
                dataSource={apiKeys}
                columns={[
                    {
                        title: "API Keys",
                        dataIndex: "key",
                        render: (_, rec) => (
                            <span style={{ display: "flex", alignItems: "center", fontFamily: "monospace", fontSize: 12 }}>
                                <span style={{ color: rec.expiresAt && moment.utc().isAfter(rec.expiresAt) ? "red" : undefined }}>
                                    {unmaskedKeys.includes(rec.key) ? rec.key : rec.key.replace(/./g, "*")}
                                </span>
                                <Button
                                    size="small"
                                    icon={unmaskedKeys.includes(rec.key) ? <EyeInvisibleFilled /> : <EyeFilled />}
                                    style={{ marginLeft: 20 }}
                                    onClick={() => handleToggleUnmaskKey(rec.key)}
                                />
                                <Button size="small" icon={<CopyFilled />} style={{ marginLeft: 10 }} onClick={() => handleCopyText(rec.key)} />
                            </span>
                        ),
                    },
                    {
                        title: "Expires in",
                        render: (_, rec) => {
                            const daysLeft = moment.utc(rec.expiresAt).diff(moment.utc());
                            return rec.expiresAt
                                ? daysLeft > 0
                                    ? prettyMs(daysLeft, { unitCount: 1, verbose: true })
                                    : daysLeft < 0
                                    ? "expired"
                                    : "today"
                                : "never";
                        },
                    },
                    {
                        title: (
                            <div style={{ textAlign: "center" }}>
                                <NewKeyPopover tenantId={tenantId}>
                                    <Button type="primary" icon={<PlusOutlined />}>
                                        New Key
                                    </Button>
                                </NewKeyPopover>
                            </div>
                        ),
                        width: 150,
                        render: (_, rec) => {
                            const keyExpired = !!(rec.expiresAt && moment.utc().isAfter(rec.expiresAt));
                            return (
                                <div style={{ textAlign: "right", marginRight: 20 }}>
                                    <Button
                                        size="small"
                                        danger
                                        icon={<DeleteOutlined />}
                                        style={{ marginLeft: 10 }}
                                        onClick={() => handleDeleteKey(rec._id, keyExpired)}
                                        loading={deletingKey === rec.key}
                                        disabled={deletingKey === rec.key}
                                    />
                                </div>
                            );
                        },
                    },
                ]}
            />
        </>
    );
};
