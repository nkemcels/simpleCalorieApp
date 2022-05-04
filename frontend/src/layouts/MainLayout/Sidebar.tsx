import React, { useEffect, useState } from "react";
import Menu from "antd/lib/menu";
import Badge from "antd/lib/badge";
import classNames from "classnames";
import DashboardIcon from "@ant-design/icons/HomeOutlined";
import ContactIcon from "@ant-design/icons/ContactsOutlined";
import ProjectIcon from "@ant-design/icons/ProjectOutlined";
import DiaryIcon from "@ant-design/icons/FieldTimeOutlined";
import DocumentIcon from "@ant-design/icons/FileAddOutlined";
import ServiceFeesIcon from "@ant-design/icons/WalletOutlined";
import SettingsIcon from "@ant-design/icons/SettingOutlined";
import { useHistory } from "react-router-dom";

import Styles from "./MainLayout.scss";
import * as Routes from "../../constants/appRoutes";
import { RouteAction } from "../../actions/RouteAction";
import { ApartmentOutlined, DatabaseOutlined, FileProtectOutlined, LeftOutlined, SolutionOutlined, TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";

type TMenuKey = "dashboard" | "devices" | "tenants" | "customers" | "applications" | "settings" | string;

export type TSidebarMenuItem = {
    label: string;
    icon?: React.ReactNode;
    route: string;
    key: TMenuKey;
    hidden?: boolean;
    disabled?: boolean;
    selected?: boolean;
};

/**
 * Props for the {@link Sidebar} component
 */
export type SidebarProps = {
    /**
     * Sidebar menu items
     */
    menuItems: TSidebarMenuItem[];

    /**
     * Menu items to be hidden
     */
    hiddenItems?: TMenuKey[];

    /**
     * Menu items to disable
     */
    disabledItems?: TMenuKey[];

    /**
     * Badge counts to be displayed at the side of each menu item. (e.g number of messages etc)
     */
    itemBadeCounts?: { menu: TMenuKey; count: number }[];

    dummySidebar?: boolean;

    theme?: "dark" | "light";

    /**
     * Called when an item is clicked. Returning `false` from this callback prevents
     * the default action of routing to the clicked menu screen.
     */
    onItemClick?: (menuItem: TSidebarMenuItem) => boolean;

    onBack?: () => void;
    header?: React.ReactNode;
};

/**
 * Props for the {@link DefaultAppSidebar} component
 */
export type DefaultAppSidebarProps = {
    hiddenItems?: TMenuKey[];
    disabledItems?: TMenuKey[];
    itemBadeCounts?: { menu: TMenuKey; count: number }[];
    dummySidebar?: boolean;
    theme?: "dark" | "light";
    onItemClick?: (menuItem: TSidebarMenuItem) => boolean;
};

const DEFAULT_SIDEBAR_ITEMS: TSidebarMenuItem[] = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <DashboardIcon />,
        route: Routes.DASHBOARD_ROUTE,
    },
    {
        key: "devices",
        label: "Devices",
        icon: <DatabaseOutlined />,
        route: Routes.DEVICES_ROUTE,
    },
    {
        key: "tenants",
        label: "Tenants",
        icon: <ApartmentOutlined />,
        route: Routes.TENANTS_ROUTE,
    },
    {
        key: "customers",
        label: "Customers",
        icon: <TeamOutlined />,
        route: Routes.CUSTOMERS_ROUTE,
    },
    {
        key: "applications",
        label: "Applications",
        icon: <SolutionOutlined />,
        route: Routes.APPLICATIONS_ROUTE,
    },
    {
        key: "settings",
        label: "Settings",
        icon: <SettingsIcon />,
        route: Routes.SETTINGS_ROUTE,
    },
];

/**
 * Renders the sidebar using the provided menu items.
 *
 * ### Usage
 * ```js
 * <Sidebar
 *   menuItems={[...]}
 *   hiddenItems={[...]}
 *   disabledItems={[...]}
 *   itemBadeCounts={[...]}
 *   onItemClick={(item)=>{...}}
 *   />
 * ```
 *
 * ### Props
 * {@link SidebarProps}
 */
export const Sidebar: React.FC<SidebarProps> = ({
    menuItems,
    hiddenItems = [],
    itemBadeCounts = [],
    disabledItems = [],
    dummySidebar,
    header,
    theme,
    onItemClick,
    onBack,
}) => {
    const [activeItemKey, setActiveItemKey] = useState<TMenuKey>();
    const history = useHistory();
    const handleItemClick = (item: TSidebarMenuItem) => {
        if (item.key === activeItemKey) return;
        if (onItemClick) {
            // returning false in onItemClick function should prevent default behaviour
            // of pushing to the provided route.
            const shouldContinueAction = onItemClick(item);
            if (shouldContinueAction && item.route) {
                RouteAction.goto(item.route);
            }
        } else if (item.route) RouteAction.goto(item.route);
    };
    useEffect(() => {
        const activeRoute = RouteAction.CURRENT_PATHNAME;
        console.log("ACTIVE ROUTE ", activeRoute);
        const item = menuItems.find((t) => activeRoute.startsWith(t.route));
        const selectedItem = menuItems.find((t) => t.selected);
        if (selectedItem || item) setActiveItemKey(selectedItem?.key || item!.key);
    }, [history.location.pathname, menuItems]);
    return (
        <div className={classNames(Styles.Sidebar, { [Styles.DarkTheme]: theme === "dark" })}>
            <div className={Styles.MenuContainer}>
                {header && (
                    <div className={Styles.SidebarHeader}>
                        {onBack && <Button icon={<LeftOutlined />} type="link" size="small" style={{ marginRight: 7 }} onClick={onBack} />}
                        {header}
                    </div>
                )}
                <Menu selectable activeKey={activeItemKey} selectedKeys={dummySidebar ? undefined : [activeItemKey || ""]} theme={theme || "light"}>
                    {menuItems
                        .filter((t) => !t.hidden)
                        .filter((t) => !hiddenItems.includes(t.key))
                        .map((item) =>
                            dummySidebar ? (
                                <Menu.Item className={Styles.DummyMenuItem} key={item.key}>
                                    <div className={Styles.Inner} />
                                </Menu.Item>
                            ) : (
                                <Menu.Item
                                    key={item.key}
                                    icon={<span className={classNames([Styles.ItemIcon])}>{item.icon}</span>}
                                    onClick={() => handleItemClick(item)}
                                    disabled={!!item.disabled || disabledItems.includes(item.key)}
                                >
                                    {item.label}
                                    {!!itemBadeCounts.find((t) => t.menu === item.key)?.count && (
                                        <div className={Styles.MenuItemBadge}>
                                            <Badge count={itemBadeCounts.find((t) => t.menu === item.key)?.count} size="small" />
                                        </div>
                                    )}
                                </Menu.Item>
                            ),
                        )}
                </Menu>
            </div>
            <div className={Styles.BottomMenuContainer}></div>
        </div>
    );
};

/**
 * Renders the sidebar with a default set of menu options.
 * These are the menu options that most routes need by default.
 *
 * ### Usage
 * ```js
 * <DefaultAppSidebar
 *   isCollapsed={false}
 *   hiddenItems={[...]}
 *   disabledItems={[...]}
 *   itemBadeCounts={[...]}
 *   onItemClick={(item)=>{...}}
 * />
 * ```
 *
 * ### Props
 * {@link DefaultAppSidebarProps}
 */
export const AppSidebar: React.FC<DefaultAppSidebarProps> = ({ hiddenItems, itemBadeCounts, disabledItems, dummySidebar, theme, onItemClick }) => {
    return (
        <Sidebar
            menuItems={DEFAULT_SIDEBAR_ITEMS}
            hiddenItems={hiddenItems}
            disabledItems={disabledItems}
            itemBadeCounts={itemBadeCounts}
            dummySidebar={dummySidebar}
            onItemClick={onItemClick}
            theme={theme}
        />
    );
};

export default Sidebar;
