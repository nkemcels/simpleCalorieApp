import React from "react";
import Logo from "../../components/Logo/Logo";
import UserAccountButton from "./UserAccountButton/UserAccountButton";
import Styles from "./MainLayout.scss";

/**
 * Renders the default app header
 */
export const AppHeader = () => {
    return (
        <div className={Styles.Header}>
            <div className={Styles.LogoWrapper}>
                <h4 className={Styles.Name}>
                    Simple Calorie App
                    <span className={Styles.Location}>Home</span>
                </h4>
            </div>
            <div className={Styles.HeaderActions}>
                <div className={Styles.UserAccountBtn}>
                    <UserAccountButton />
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
