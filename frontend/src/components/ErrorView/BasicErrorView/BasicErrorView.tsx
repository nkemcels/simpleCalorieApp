import React from "react";
import Styles from "./BasicErrorView.scss";
import errorImg from "../../../assets/img/error-icon-1.png";

const BasicErrorView: React.FC<{ error: React.ReactNode; description?: string }> = ({ error, description }) => {
    return (
        <div className={Styles.Container}>
            <img src={errorImg} className={Styles.ErrorImg} />
            <div className={Styles.ErrorText}>{error || "Something went wrong"}</div>
            {description && <div className={Styles.ErrorDescription}>{description}</div>}
        </div>
    );
};

export default BasicErrorView;
