import React from "react";
import { HSplitView } from "../../components/HSplitView/HSplitView";
import AppHeader from "./Header";
import Styles from "./MainLayout.scss";
import { AppSidebar } from "./Sidebar";

const MainLayout: React.FC<{ content?: React.ReactNode; darkSidebar?: boolean }> = ({ children, content, darkSidebar }) => {
    return (
        <div className={Styles.Container}>
            <div className={Styles.HeaderContainer}>
                <AppHeader />
            </div>
            <div className={Styles.ContentWrapper}>
                <div className={Styles.ContentContainer}>{content || React.Children.toArray(children)[0]}</div>
            </div>
        </div>
    );
};

export default MainLayout;
