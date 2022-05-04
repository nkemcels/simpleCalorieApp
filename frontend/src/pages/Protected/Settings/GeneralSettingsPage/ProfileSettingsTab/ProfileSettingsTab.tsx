import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import Styles from "./ProfileSettingsTab.scss";
import Button from "antd-button-color";
import SaveIcon from "@ant-design/icons/SaveOutlined";
import UserIcon from "@ant-design/icons/UserOutlined";
import EditIcon from "@ant-design/icons/EditOutlined";
import DangerZoneIcon from "@ant-design/icons/ExclamationCircleFilled";
import LockIcon from "@ant-design/icons/LockOutlined";
import LeaveIcon from "@ant-design/icons/UserDeleteOutlined";
import { AppManager } from "../../../../../manager";
import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reducers";
import { TUserData, User } from "../../../../../models/User/User";
import { Organization } from "../../../../../models/Organization/Organization";
import SectionPane from "../SharedComponents/SectionPane";
import CheckIcon from "@ant-design/icons/CheckOutlined";
import InfoIcon from "@ant-design/icons/InfoCircleFilled";

const BasicInfoView = () => {
    const [saving, setSaving] = useState(false);
    const user = AppManager.user.getActiveUser()!;
    const [userAttr, setUserAttr] = useState(user.data.attrs);

    const handleSaveChanges = (saveData: Partial<TUserData>) => {
        AppManager.user.apiUpdateUserData(saveData, (err) => {
            setSaving(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else AppManager.alert.msgSuccess("Info Updated");
        });
    };

    useEffect(() => {
        user.data.watch("ATTRIBUTES_UPDATED", setUserAttr);
        return () => user.data.unwatch("ATTRIBUTES_UPDATED", setUserAttr);
    }, []);
    return (
        <Spin spinning={saving} tip="Saving...">
            <div className={Styles.BasicInfoView}>
                <div className={Styles.ProfileImgContainer}>
                    <div className={Styles.AvatarWrapper}>
                        <UserIcon />
                    </div>
                </div>
                <div className={Styles.FormContent}>
                    <Form labelCol={{ span: 4 }} initialValues={userAttr} name="Profile-Settings-UserInfo" onFinish={handleSaveChanges}>
                        <Form.Item label="First Name" name="firstName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Last Name" name="lastName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Telephone" name="telephone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Short Bio" name="bio">
                            <Input.TextArea />
                        </Form.Item>
                        <div style={{ marginTop: 10, textAlign: "center" }}>
                            <Button type="info" htmlType="submit" disabled={saving} loading={saving}>
                                <SaveIcon /> Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Spin>
    );
};

const LoginCredentialsView = () => {
    const user = AppManager.user.getActiveUser()!;
    const [userAttr, setUserAttr] = useState(user.data.attrs);
    useEffect(() => {
        user.data.watch("ATTRIBUTES_UPDATED", setUserAttr);
        return () => user.data.unwatch("ATTRIBUTES_UPDATED", setUserAttr);
    }, []);
    return (
        <div className={Styles.LoginCredentialsView}>
            <div className={Styles.FormContent}>
                <Form
                    labelCol={{ span: 4 }}
                    layout="vertical"
                    style={{ display: "flex" }}
                    initialValues={{ email: userAttr.email, password: "this is not the password" }}
                >
                    <Form.Item label="Email" name="email" style={{ flex: 1, maxWidth: 500, marginRight: 10 }}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Password" name="password" style={{ flex: 1, maxWidth: 500, marginLeft: 10 }}>
                        <Input.Password disabled />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

const UpdatePasswordView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [updating, setUpdating] = useState(false);
    const user = AppManager.user.getActiveUser()!;
    const handleSavePassword = (values: { currentPassword: string; newPassword: string }) => {
        setUpdating(true);
        AppManager.auth.updateCredentials(
            {
                email: user.data.attrs.email,
                password: values.newPassword,
                oldPassword: values.currentPassword,
            },
            true,
            (err) => {
                setUpdating(false);
                if (err) AppManager.alert.toastError(`${err}`);
                else {
                    AppManager.alert.msgSuccess("Password updated");
                    onClose();
                }
            },
        );
    };
    return (
        <div className={Styles.UpdatePasswordView}>
            <Form labelCol={{ span: 8 }} onFinish={handleSavePassword}>
                <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]}>
                    <Input.Password placeholder="Enter current password" />
                </Form.Item>
                <Form.Item label="New Password" name="newPassword" rules={[{ required: true, min: 6, max: 20 }]}>
                    <Input.Password placeholder="Enter new password" />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                            validator: (_, value) => {
                                if (getFieldValue("newPassword") !== value) return Promise.reject(new Error("Confirmation password does not match"));
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm new password" />
                </Form.Item>
                <div className={Styles.Actions}>
                    <Button style={{ marginRight: 10 }} icon={<CheckIcon />} type="primary" htmlType="submit" disabled={updating} loading={updating}>
                        Save
                    </Button>
                    <Button onClick={onClose} disabled={updating}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
};

const ProfileSettingsTab = () => {
    const showChangePasswordModal = () => {
        const modal = Modal.info({
            title: "Update Password",
            width: 550,
            content: <UpdatePasswordView onClose={() => modal.destroy()} />,
            icon: null,
            okButtonProps: { style: { display: "none" } },
        });
    };
    const handleDeleteAccount = () => {
        AppManager.alert.toastInfo("This feature is being worked on");
    };
    return (
        <div className={Styles.Container}>
            <SectionPane icon={<UserIcon />} title="Your Basic Info" content={<BasicInfoView />} />
            <SectionPane
                title="Login Credentials"
                icon={<LockIcon />}
                extraActions={
                    <Button icon={<EditIcon />} onClick={showChangePasswordModal}>
                        Change Password
                    </Button>
                }
                content={<LoginCredentialsView />}
            />
            <SectionPane
                title={<span style={{ color: "#b71c1c" }}>Danger Zone</span>}
                icon={<DangerZoneIcon style={{ color: "#b71c1c" }} />}
                content={
                    <>
                        <div className={Styles.DangerActionWrapper}>
                            <div className={Styles.ActionView}>
                                <div className={Styles.Title}>Delete my account</div>
                                <div className={Styles.Action}>
                                    <Button danger type="primary" onClick={handleDeleteAccount}>
                                        <DeleteIcon /> Delete
                                    </Button>
                                </div>
                            </div>
                            <div className={Styles.Description}>
                                <InfoIcon /> Deleting your account will delete all of your organizations and all their data. This action is not
                                reversible.
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default ProfileSettingsTab;
