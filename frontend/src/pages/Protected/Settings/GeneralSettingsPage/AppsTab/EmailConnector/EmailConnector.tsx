import React, { useRef, useState, useEffect } from "react";
import { Alert, Collapse, Drawer, Form, Input, Modal, Spin, Table } from "antd";
import Button from "antd-button-color";
import { Provider } from "react-redux";
import CloseIcon from "@ant-design/icons/CloseOutlined";
import ConnectIcon from "@ant-design/icons/ApiOutlined";
import MailIcon from "@ant-design/icons/MailFilled";
import Styles from "./EmailConnector.scss";
import AppContent from "../../../../../../containers/AppContent/AppContent";
import { getAppStore } from "../../../../../../redux/store";
import { useForm } from "antd/lib/form/Form";
import { AppManager } from "../../../../../../manager";
import { TConnectedEmailInfo } from "../../../../../../models/User/User";
import ContactDisplay from "../../../../../../components/CustomDisplays/ContactDisplay/ContactDisplay";
import { useModelEventWatcher } from "../../../../../../hooks/modelHook";
import PagePlaceholder from "../../../../../../components/PagePlaceholder/PagePlaceholder";

const SUPPORTED_EMAIL_PROVIDERS = {
    "gmail.com": { host: "imap.gmail.com", port: 993 },
    "outlook.com": { host: "imap-mail.outlook.com", port: 993 },
    "aol.com": { host: "imap.aol.com", port: 993 },
    "zoho.com": { host: "imap.zoho.com", port: 993 },
    "yahoo.com": { host: "imap.mail.yahoo.com", port: 993 },
} as { [k: string]: { host: string; port: number } | undefined };

const getKnownEmailProvider = (email = "") => {
    return SUPPORTED_EMAIL_PROVIDERS[email.substring(email.indexOf("@") + 1)];
};

const EmailConnectorView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [disconnectingEmail, setDisconnectingEmail] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [userEmaiLInfo, setConnectedEmailInfo] = useState<TConnectedEmailInfo>();
    const containerRef = useRef<HTMLDivElement>(null);
    const orgId = AppManager.org.getCurrentActiveOrg()?.id || "";
    const user = AppManager.user.getActiveUser();
    const [userAttr] = useModelEventWatcher(user, "ATTRIBUTES_UPDATED", user?.data.attrs);

    const handleConnectEmail = async (data: any) => {
        setConnecting(true);
        AppManager.user.apiConnectUserEmail({ ...data, organization: orgId }, (err) => {
            setConnecting(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else {
                AppManager.alert.msgSuccess("Email connected");
                setOpenDrawer(false);
            }
        });
    };

    const handleDisconnectEmail = async (email: string) => {
        AppManager.alert.confirmAction("Confirm Email Disconnect", "Are you sure you want to disconnect this email?", (res) => {
            if (res === "OK") {
                setDisconnectingEmail(email);
                AppManager.user.apiDisconnectUserEmail(email, (err) => {
                    setDisconnectingEmail(undefined);
                    if (err) AppManager.alert.toastError(`${err}`);
                    else {
                        AppManager.alert.msgSuccess("Email disconnected");
                        setOpenDrawer(false);
                    }
                });
            }
        });
    };

    useEffect(() => {
        console.log("LOADING...");
        setLoading(true);
        AppManager.user.apiGetConnectUserEmails((err, data) => {
            setLoading(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else {
                setConnectedEmailInfo(data);
            }
        });
    }, []);

    return (
        <AppContent
            header="Connected Emails Manager"
            showNetworkState={false}
            containerRef={containerRef}
            headerActions={
                <>
                    <Button style={{ marginRight: 20 }} type="primary" onClick={() => setOpenDrawer(true)}>
                        Connect New Email
                    </Button>
                    <Button danger type="link" style={{ marginRight: 15 }} onClick={onClose} icon={<CloseIcon />} size="small">
                        Close
                    </Button>
                </>
            }
        >
            <div className={Styles.ViewContainer}>
                <div className={Styles.InnerWrapper}>
                    {!!userAttr?.connectedEmails?.length ? (
                        <Spin spinning={loading} tip="Loading...">
                            <div className={Styles.ConnectedEmails}>
                                <div className={Styles.Header}>All Connected Emails</div>
                                {userAttr?.connectedEmails?.map((item) => (
                                    <div className={Styles.EmailItem} key={item.email}>
                                        <div className={Styles.Name}>
                                            <MailIcon style={{ marginRight: 10 }} /> {item.email}
                                        </div>
                                        <div>
                                            <Button
                                                danger
                                                size="small"
                                                loading={disconnectingEmail === item.email}
                                                disabled={!!disconnectingEmail}
                                                onClick={() => handleDisconnectEmail(item.email)}
                                            >
                                                Disconnect
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Table
                                dataSource={userEmaiLInfo?.contacts || []}
                                columns={[
                                    {
                                        title: "Assigned contacts on inbox watchlist",
                                        render: (_, rec) => <ContactDisplay link={false} avatarSize={24} contact={rec.id} showType />,
                                    },
                                    {
                                        title: "Email",
                                        dataIndex: "email",
                                    },
                                ]}
                            />
                        </Spin>
                    ) : (
                        <PagePlaceholder image="" title="" desc="You haven't connected any emails yet" />
                    )}
                </div>
            </div>
            <Drawer title="Connect New Email" visible={openDrawer} onClose={() => setOpenDrawer(false)} width={500}>
                <Form layout="vertical" key={`${openDrawer}`} onFinish={handleConnectEmail}>
                    <Form.Item noStyle shouldUpdate>
                        {({ setFieldsValue }) => (
                            <Form.Item name="email" label="Email" hasFeedback rules={[{ required: true, type: "email" }]}>
                                <Input
                                    onChange={(e) => {
                                        const knownProvider = getKnownEmailProvider(e.target.value);
                                        if (knownProvider) setFieldsValue({ imapHost: knownProvider.host, imapPort: knownProvider.port });
                                    }}
                                />
                            </Form.Item>
                        )}
                    </Form.Item>
                    <Form.Item name="password" label="Password">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => (
                            <Form.Item
                                hasFeedback
                                label="IMAP Host"
                                name="imapHost"
                                rules={[{ required: true }]}
                                tooltip="This is the hostname of your email provider's IMAP Server."
                            >
                                <Input disabled={!getFieldValue("email") || !!getKnownEmailProvider(getFieldValue("email"))} />
                            </Form.Item>
                        )}
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => (
                            <Form.Item
                                hasFeedback
                                label="IMAP Port"
                                name="imapPort"
                                rules={[{ required: true }]}
                                tooltip="This is the IMAP port used by the host of your email provider"
                            >
                                <Input disabled={!getFieldValue("email") || !!getKnownEmailProvider(getFieldValue("email"))} />
                            </Form.Item>
                        )}
                    </Form.Item>
                    <Form.Item name="organization" initialValue="org" style={{ display: "none" }} />
                    <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) =>
                            getKnownEmailProvider(getFieldValue("email"))?.host === "imap.gmail.com" ? (
                                <Alert
                                    style={{ marginTop: 30, marginBottom: 30 }}
                                    message={
                                        <span>
                                            Please ensure that you've{" "}
                                            <a href="https://myaccount.google.com/lesssecureapps" target="_blank" rel="noreferrer">
                                                {" "}
                                                turned on less secured apps
                                            </a>{" "}
                                            in your gmail imap settings before you connect
                                        </span>
                                    }
                                    closable
                                />
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                            <Button icon={<ConnectIcon />} loading={connecting} disabled={connecting} htmlType="submit" size="large" type="primary">
                                Connect
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Drawer>
        </AppContent>
    );
};

export const openEmailConnector = () => {
    const modal = Modal.info({
        content: (
            <Provider store={getAppStore()}>
                <div style={{ height: window.innerHeight - 130 }}>
                    <EmailConnectorView onClose={() => modal.destroy()} />
                </div>
            </Provider>
        ),
        icon: null,
        okButtonProps: { style: { display: "none" } },
        width: window.innerWidth - 50,
        centered: true,
    });

    return modal;
};
