import React, { useState } from "react";
import { Checkbox, Form, Input } from "antd";
import Styles from "./NotificationsSettingsTab.scss";
import Button from "antd-button-color";
import PauseIcon from "@ant-design/icons/PauseOutlined";
import ResumeIcon from "@ant-design/icons/PlayCircleOutlined";
import { AppManager } from "../../../../../manager";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reducers";
import { TUserData, TUserNotfSettingsAttr, User } from "../../../../../models/User/User";
import SectionPane from "../SharedComponents/SectionPane";
import { useModelEventWatcher } from "../../../../../hooks/modelHook";
import InfoCircleIcon from "@ant-design/icons/InfoCircleFilled";

const DoNotDisturbView = () => {
    const userModel = useSelector<RootState, User>((r) => r.user.user!);
    const [userAttr] = useModelEventWatcher(userModel, "ATTRIBUTES_UPDATED", userModel.data.attrs);
    const notfSettings = userAttr.notificationSettings;
    const [updating, setUpdating] = useState(false);
    const handleUpdate = (newSettings: TUserNotfSettingsAttr) => {
        setUpdating(true);
        AppManager.user.apiUpdateUserNotfSettings(newSettings, (err) => {
            setUpdating(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else AppManager.alert.msgSuccess("Settings updated");
        });
    };
    return (
        <div className={Styles.PauseNotfContainer}>
            <Button
                loading={updating}
                disabled={updating}
                size="large"
                icon={notfSettings?.pauseAll ? <ResumeIcon /> : <PauseIcon />}
                type={notfSettings?.pauseAll ? "info" : "warning"}
                onClick={() => handleUpdate({ ...notfSettings, pauseAll: !notfSettings?.pauseAll })}
            >
                {notfSettings?.pauseAll ? "Resume Notifications" : "Pause all notifications"}
            </Button>
            {notfSettings?.pauseAll && (
                <div className={Styles.Text}>
                    <InfoCircleIcon /> All notifications are paused. Unless resumed, you won&apos;t receive any email or browser notifications.
                </div>
            )}
        </div>
    );
};

const EmailNotificationsView = () => {
    const userModel = useSelector<RootState, User>((r) => r.user.user!);
    const [userAttr] = useModelEventWatcher(userModel, "ATTRIBUTES_UPDATED", userModel.data.attrs);
    const notfSettings = userAttr.notificationSettings;
    const [updating, setUpdating] = useState(false);
    const handleUpdate = (newSettings: TUserNotfSettingsAttr) => {
        setUpdating(true);
        AppManager.user.apiUpdateUserNotfSettings(newSettings, (err) => {
            setUpdating(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else AppManager.alert.msgSuccess("Settings updated");
        });
    };
    return (
        <div className={Styles.NotificationSettingsContainer}>
            <div className={Styles.ItemTitle}>Send me emails for...</div>
            <div className={Styles.ItemContent}>
                <div className={Styles.ItemCheckbox}>
                    <Checkbox
                        checked={userAttr.notificationSettings?.email?.contactActivity}
                        style={{ fontSize: 16 }}
                        disabled={updating}
                        onChange={(e) => {
                            handleUpdate({ ...notfSettings, email: { ...notfSettings?.email, contactActivity: e.target.checked } });
                        }}
                    >
                        Contact Activity Updates
                    </Checkbox>
                </div>
                <div className={Styles.ItemDescription}>
                    You will receive email notifications when your assigned contact(s) interacts with ausplan, like sign documents, complete forms etc
                </div>
            </div>
            <div className={Styles.ItemContent}>
                <div className={Styles.ItemCheckbox}>
                    <Checkbox
                        checked={userAttr.notificationSettings?.email?.taskUpdates}
                        style={{ fontSize: 16 }}
                        disabled={updating}
                        onChange={(e) => {
                            handleUpdate({ ...notfSettings, email: { ...notfSettings?.email, taskUpdates: e.target.checked } });
                        }}
                    >
                        Task Updates
                    </Checkbox>
                </div>
                <div className={Styles.ItemDescription}>
                    You will receive email notifcations when your teammates complete tasks you assigned to them or when you are assigned to new tasks
                </div>
            </div>
        </div>
    );
};

const AppNotificationsView = () => {
    const userModel = useSelector<RootState, User>((r) => r.user.user!);
    const [userAttr] = useModelEventWatcher(userModel, "ATTRIBUTES_UPDATED", userModel.data.attrs);
    const notfSettings = userAttr.notificationSettings;
    const [updating, setUpdating] = useState(false);
    const handleUpdate = (newSettings: TUserNotfSettingsAttr) => {
        setUpdating(true);
        AppManager.user.apiUpdateUserNotfSettings(newSettings, (err) => {
            setUpdating(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else AppManager.alert.msgSuccess("Settings updated");
        });
    };
    return (
        <div className={Styles.NotificationSettingsContainer}>
            <div className={Styles.ItemTitle}>Send me in-app/browser notifications for...</div>
            <div className={Styles.ItemContent}>
                <div className={Styles.ItemCheckbox}>
                    <Checkbox
                        checked={notfSettings?.browser?.contactActivity}
                        style={{ fontSize: 16 }}
                        disabled={updating}
                        onChange={(e) => {
                            handleUpdate({ ...notfSettings, browser: { ...notfSettings?.browser, contactActivity: e.target.checked } });
                        }}
                    >
                        Contact Activity Updates
                    </Checkbox>
                </div>
                <div className={Styles.ItemDescription}>
                    You will receive browser notifications when your assigned contact(s) interacts with ausplan, like sign documents, complete forms
                    etc
                </div>
            </div>
            <div className={Styles.ItemContent}>
                <div className={Styles.ItemCheckbox}>
                    <Checkbox
                        checked={notfSettings?.browser?.taskUpdates}
                        style={{ fontSize: 16 }}
                        disabled={updating}
                        onChange={(e) => {
                            handleUpdate({ ...notfSettings, browser: { ...notfSettings?.browser, taskUpdates: e.target.checked } });
                        }}
                    >
                        Task Updates
                    </Checkbox>
                </div>
                <div className={Styles.ItemDescription}>
                    You will receive browser notifications when your teammates complete tasks you assigned to them or when you are assigned to new
                    tasks
                </div>
            </div>
        </div>
    );
};

const NotificationsSettingsTab = () => {
    return (
        <div className={Styles.Container}>
            <SectionPane title="Do not disturb" content={<DoNotDisturbView />} />
            <SectionPane title="Email notifications" content={<EmailNotificationsView />} />
            <SectionPane title="In-App notifications" content={<AppNotificationsView />} />
        </div>
    );
};

export default NotificationsSettingsTab;
