import React from "react";
import LoadingIcon from "@ant-design/icons/Loading3QuartersOutlined";
import Styles from "./Loading.scss";

const Loading: React.FC<{ text?: string }> = ({ text }) => {
    return (
        <div className={Styles.Container}>
            <LoadingIcon spin className={Styles.LoadingIcon} />
            <div className={Styles.LoadingText}>{text || "Loading..."}</div>
        </div>
    );
};

export default Loading;
