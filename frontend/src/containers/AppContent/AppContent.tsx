import { Alert } from "antd";
import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@ant-design/icons/CaretRightOutlined";
import { useSelector } from "react-redux";
import { TNetworkState } from "../../models/_Utils/NetworkState";
import { RootState } from "../../redux/reducers";
import Styles from "./AppContent.scss";

type AppContentProps = {
    header: React.ReactNode;
    subHeader?: React.ReactNode;
    headerActions?: React.ReactNode;
    containerRef?: React.RefObject<HTMLDivElement>;
    showNetworkState?: boolean;
    noContentPadding?: boolean;
    contentPadding?: string | number;
};

const AppContent: React.FC<AppContentProps> = ({
    children,
    header,
    subHeader,
    headerActions,
    containerRef,
    showNetworkState = true,
    noContentPadding,
    contentPadding = "0 30px 15px 30px",
}) => {
    const networkState = useSelector<RootState, TNetworkState | undefined>((s) => s.app.networkState);
    const [status, setStatus] = useState<TNetworkState>();
    useEffect(() => {
        if (status && status !== "online" && networkState == "online") {
            setStatus(networkState);
            setTimeout(() => {
                setStatus(undefined);
            }, 2500);
        } else if (networkState !== "online") setStatus(networkState);
    }, [networkState]);
    return (
        <>
            <div className={Styles.Container} ref={containerRef}>
                {showNetworkState && (
                    <div style={{ padding: "4px 7px" }}>
                        {status && status !== "online" ? (
                            <Alert message={status == "reconnecting" ? "Reconnecting..." : "You're offline"} type="error" showIcon />
                        ) : status === "online" ? (
                            <Alert message="Connection Restored" showIcon type="success" />
                        ) : null}
                    </div>
                )}
                <div className={Styles.HeaderContainer} style={{ padding: "15px 30px" }}>
                    <div className={Styles.Header}>
                        {header}
                        {subHeader && (
                            <div className={Styles.SubHeader}>
                                <ChevronRightIcon className={Styles.Icon} /> {subHeader}
                            </div>
                        )}
                    </div>
                    <div className={Styles.HeaderActions}>{headerActions}</div>
                </div>
                <div className={Styles.ContentWrapper} style={{ padding: noContentPadding ? 0 : contentPadding }}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default AppContent;
