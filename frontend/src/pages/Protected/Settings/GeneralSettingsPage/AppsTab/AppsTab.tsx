import { Col, Row } from "antd";
import React from "react";
import Styles from "./AppsTab.scss";
import iressLogo from "../../../../../assets/img/Iress_logo.png";
import { AppManager } from "../../../../../manager";
import windowsLogoImg from "../../../../../assets/img/windows_logo.png";
import macLogoImg from "../../../../../assets/img/mac_logo.png";
import linuxLogoImg from "../../../../../assets/img/linux_logo.png";
import androidLogoImg from "../../../../../assets/img/android_logo.png";
import iosPhoneImg from "../../../../../assets/img/ios_phone.png";
import connectEmailImg from "../../../../../assets/img/connect_email_image.png";
import officeCalendarImg from "../../../../../assets/img/o365_calendar_image.png";
import { usePrivileges } from "../../../../../hooks/userPrivilegeHook";
import ProtectedAction from "../../../../../components/ProtectedAction";
import SectionPane from "../SharedComponents/SectionPane";
import AppsIcon from "@ant-design/icons/AppstoreOutlined";
import { openEmailConnector } from "./EmailConnector/EmailConnector";
import { useProvideOutlookCalContext } from "../../../../../containers/CalendarSync/OutlookCalendar/OutlookCalendarContext";

const AppItem: React.FC<{ name: React.ReactNode; description: string; onClick: () => void; icon: React.ReactNode }> = ({
    name,
    description,
    onClick,
    icon,
}) => {
    return (
        <Col sm={24} xl={12} xxl={8} onClick={onClick}>
            <div className={Styles.AppContainer}>
                <div className={Styles.AppIcon}>{icon}</div>
                <div className={Styles.InfoContainer}>
                    <div className={Styles.AppName}>{name}</div>
                    <div className={Styles.AppDesc}>{description}</div>
                </div>
            </div>
        </Col>
    );
};

const AppsTab = () => {
    const privilege = usePrivileges();
    const o365Cal = useProvideOutlookCalContext();
    const handleOpenIressMigrator = () => {
        if (privilege.isOwner) {
            AppManager.route.gotoXplanMigrationPage();
        } else {
            AppManager.alert.warning("Unauthorized Action", "This feature is only available to organization owners");
        }
    };
    const handleConnectEmail = () => openEmailConnector();
    const handleOpenAusplanMobile = () => {
        AppManager.alert.msgInfo("Ausplan mobile app is coming soon. Stay tuned ;)");
    };
    const handleOpenAusplanDesktop = () => {
        AppManager.alert.msgInfo("Ausplan desktop app is coming soon. Stay tuned ;)");
    };
    const handleConnectOutlookCalendar = () => {
        if (o365Cal.user) {
            AppManager.alert.confirmAction("Confirm Action", "Are you sure you want to disconnect your calendar?", (res) => {
                if (res === "OK") o365Cal.signOut();
            });
        } else {
            o365Cal.signIn();
        }
    };
    return (
        <div className={Styles.Container}>
            <SectionPane title="Integrations" icon={<AppsIcon />}>
                <Row className="match-parent">
                    <AppItem
                        name="Connect Email"
                        description="Connect your email with ausplan to better manage your contacts"
                        icon={<img src={connectEmailImg} />}
                        onClick={handleConnectEmail}
                    />
                    <AppItem
                        name={<span>{o365Cal.user ? "Disconnect" : "Connect"} O365 Calendar</span>}
                        description={
                            o365Cal.user ? "Click to disconnect your calendar." : "Sync Microsoft Office 365 calendar with your Ausplan Diary"
                        }
                        icon={<img src={officeCalendarImg} />}
                        onClick={handleConnectOutlookCalendar}
                    />
                </Row>
            </SectionPane>
            <SectionPane title="Apps" icon={<AppsIcon />}>
                <Row className="match-parent">
                    <AppItem
                        name="IressXplan Migration Assistant"
                        description="Migrate all your data from Iress Xplan into Ausplan with ease"
                        icon={<img src={iressLogo} />}
                        onClick={handleOpenIressMigrator}
                    />
                    <AppItem
                        name="Ausplan Mobile (Android)"
                        description="Use Ausplan from your Android mobile device and stay in sync with your contacts and teams everywhere you go"
                        icon={<img src={androidLogoImg} />}
                        onClick={handleOpenAusplanMobile}
                    />
                    <AppItem
                        name="Ausplan Mobile (iOS)"
                        description="Use Ausplan from your iOS mobile device and stay in sync with your contacts and teams everywhere you go"
                        icon={<img src={iosPhoneImg} />}
                        onClick={handleOpenAusplanMobile}
                    />
                    <AppItem
                        name="Ausplan Desktop for Mac"
                        description="Download the Ausplan desktop app for Mac and access your content offline from your computer"
                        icon={<img src={macLogoImg} />}
                        onClick={handleOpenAusplanDesktop}
                    />
                    <AppItem
                        name="Ausplan Desktop for Linux"
                        description="Download the Ausplan desktop app for Linux and access your content offline from your computer"
                        icon={<img src={linuxLogoImg} />}
                        onClick={handleOpenAusplanDesktop}
                    />
                    <AppItem
                        name="Ausplan Desktop for Windows"
                        description="Download the Ausplan desktop app for Windows and access your content offline from your computer"
                        icon={<img src={windowsLogoImg} />}
                        onClick={handleOpenAusplanDesktop}
                    />
                </Row>
            </SectionPane>
        </div>
    );
};

export default AppsTab;
