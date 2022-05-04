import React from "react";
import { HSplitView } from "../../components/HSplitView/HSplitView";
import AppHeader from "./Header";
import Styles from "./MainLayout.scss";
import Sidebar, { SidebarProps } from "./Sidebar";

const MainOptionsLayout: React.FC<{ content?: React.ReactNode; sidebarProps: SidebarProps }> = ({ children, content, sidebarProps }) => {
    return (
        <div className={Styles.Container}>
            <div className={Styles.HeaderContainer}>
                <AppHeader />
            </div>
            <div className={Styles.ContentWrapper}>
                <HSplitView stateKey="MainLayout-Split-1" minWidth={160} maxWidth={400} defaultWidth={200}>
                    <div className={Styles.SidebarContainer}>
                        <Sidebar {...sidebarProps} />
                    </div>
                    <div className={Styles.ContentContainer}>{content || React.Children.toArray(children)[0]}</div>
                </HSplitView>
            </div>
        </div>
    );
};

export default MainOptionsLayout;
