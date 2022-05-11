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
                <Logo type="with-text-right" imgStyle={{ width: 35, height: 35 }} />
                <h4 className={Styles.Name}>MyGYM Console</h4>
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
