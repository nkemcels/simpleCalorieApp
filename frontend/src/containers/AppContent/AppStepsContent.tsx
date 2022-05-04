import { Alert, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TNetworkState } from "../../models/_Utils/NetworkState";
import { RootState } from "../../redux/reducers";
import Styles from "./AppStepsContent.scss";

type AppContentProps = {
    containerRef?: React.RefObject<HTMLDivElement>;
    showNetworkState?: boolean;
    activeStep: string | number;
};

type ItemProps = { id: string | number; title: string; description?: string; done?: boolean };

const AppStepContent: React.FC<AppContentProps> & { Item: React.FunctionComponent<ItemProps> } = ({
    children,
    containerRef,
    activeStep,
    showNetworkState = true,
}) => {
    const [steps, setSteps] = useState<{ Element: React.ReactElement<ItemProps> }[]>([]);
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

    useEffect(() => {
        setSteps([]);
        React.Children.forEach(children, (child) => {
            if (!React.isValidElement(child) || child.type instanceof Item) {
                throw new Error(`"${child}" Must be of type "AppStepContent.Item"`);
            }
            const props = child.props as ItemProps;
            setSteps((t) => [...t, { Element: child }]);
        });
    }, [children]);
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
                <div className={Styles.HeaderContainer}>
                    <Steps current={steps.findIndex((t) => t.Element.props.id === activeStep)}>
                        {steps.map((step) => {
                            const { id, title, description, done } = step.Element.props;
                            return <Steps.Step key={id} title={title} description={description} status={done ? "finish" : undefined} />;
                        })}
                    </Steps>
                </div>
                <div className={Styles.ContentWrapper}>{steps.find((item) => item.Element.props.id === activeStep)?.Element}</div>
            </div>
        </>
    );
};

const Item: React.FC<ItemProps> = ({ id, title, description, children }) => {
    return <div className="match-parent">{children}</div>;
};

AppStepContent.Item = Item;

export default AppStepContent;
