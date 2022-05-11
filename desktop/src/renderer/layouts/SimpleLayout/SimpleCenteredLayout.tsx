import React from "react";
import Style from "./SimpleCenteredLayout.scss";

const SimpleCenteredLayout: React.FC = ({ children }) => {
    return (
        <div className={Style.Container}>
            <div className={Style.ContentWrapper}>{children}</div>
        </div>
    );
};

export default SimpleCenteredLayout;
