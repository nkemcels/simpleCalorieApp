import { Card, Tabs, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ProfileIcon from "@ant-design/icons/UserOutlined";
import AccountIcon from "@ant-design/icons/ApartmentOutlined";
import NotificationIcon from "@ant-design/icons/BellOutlined";
import BillingIcon from "@ant-design/icons/WalletOutlined";
import AppsIcon from "@ant-design/icons/AppstoreOutlined";
import AppContent from "../../../../containers/AppContent/AppContent";
import ProfileSettingsTab from "./ProfileSettingsTab/ProfileSettingsTab";
import { RootState } from "../../../../redux/reducers";
import { Organization, OrganizationEventMap } from "../../../../models/Organization/Organization";
import { useSelector } from "react-redux";
import AccountSettingsTab from "./AccountSettingsTab/AccountSettingsTab";
import NotificationsSettingsTab from "./NotificationsSettingsTab/NotificationsSettingsTab";
import SubscriptionSettingsTab from "./SubscriptionSettingsTab/SubscriptionSettingsTab";
import AppsTab from "./AppsTab/AppsTab";
import { useModelEventWatcher, useModelWatcher } from "../../../../hooks/modelHook";
import { usePrivileges } from "../../../../hooks/userPrivilegeHook";

const GeneralSettingsPage = () => {
    const [activeTab, setActiveTab] = useState(localStorage.getItem("GeneralSettingsPage--active-tab") || "profile");
    const containerRef = useRef<HTMLDivElement>(null);
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [orgAttr] = useModelEventWatcher(activeOrg, "ATTRIBUTES_UPDATED", activeOrg.data.attrs);

    const privilege = usePrivileges();

    useEffect(() => {
        localStorage.setItem("GeneralSettingsPage--active-tab", activeTab);
    }, [activeTab]);

    const getTabHeader = (name: React.ReactNode, icon: React.ReactNode) => {
        return (
            <span>
                {icon}
                {name}
            </span>
        );
    };
    return (
        <AppContent header="General Settings" containerRef={containerRef}>
            <Card className="match-parent">
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <Tabs.TabPane tab={getTabHeader("Profile", <ProfileIcon />)} key="profile">
                        <ProfileSettingsTab />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={getTabHeader("Notifications", <NotificationIcon />)} key="notifications">
                        <NotificationsSettingsTab />
                    </Tabs.TabPane>
                    {privilege.isOwner && (
                        <Tabs.TabPane
                            tab={getTabHeader(
                                <span>
                                    Account
                                    <Tag style={{ fontSize: 10, marginLeft: 5 }} color="pink">
                                        {orgAttr.name}
                                    </Tag>
                                </span>,
                                <AccountIcon />,
                            )}
                            key="account"
                        >
                            <AccountSettingsTab containerRef={containerRef} />
                        </Tabs.TabPane>
                    )}
                    {privilege.isOwner && (
                        <Tabs.TabPane tab={getTabHeader("Billing & Subscription", <BillingIcon />)} key="billing">
                            <SubscriptionSettingsTab />
                        </Tabs.TabPane>
                    )}
                    <Tabs.TabPane tab={getTabHeader("Apps & Integrations", <AppsIcon />)} key="apps">
                        <AppsTab />
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </AppContent>
    );
};

export default GeneralSettingsPage;
