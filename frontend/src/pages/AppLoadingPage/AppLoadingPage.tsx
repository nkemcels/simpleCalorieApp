import { Card } from "antd";
import React from "react";
import Loading from "../../components/Loading/Loading";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SimpleCenteredLayout from "../../layouts/SimpleLayout/SimpleCenteredLayout";
import Styles from "./AppLoadingPage.scss";

const Content: React.FC<{ loadingText?: string }> = ({ loadingText }) => {
    return (
        <div className={Styles.Content}>
            <Card style={{ position: "relative", padding: 20, width: 300, height: 200 }}>
                <Loading text={loadingText} />
            </Card>
        </div>
    );
};

const AppLoadingPage: React.FC<{ loadingText?: string; simple?: boolean }> = ({ loadingText, simple }) => {
    return simple ? (
        <SimpleCenteredLayout>
            <Content loadingText={loadingText} />
        </SimpleCenteredLayout>
    ) : (
        <MainLayout>
            <Content loadingText={loadingText} />
        </MainLayout>
    );
};

export default AppLoadingPage;
