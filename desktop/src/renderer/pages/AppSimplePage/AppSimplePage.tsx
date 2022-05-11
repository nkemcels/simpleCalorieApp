import { Card } from "antd";
import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Styles from "./AppSimplePage.scss";

const Content: React.FC<{ content: React.ReactNode }> = ({ content }) => {
    return (
        <div className={Styles.Content}>
            <Card style={{ position: "relative", width: "100%", height: "100%" }}>{content}</Card>
        </div>
    );
};

const AppSimplePage: React.FC<{ content: React.ReactNode }> = ({ content }) => {
    return (
        <MainLayout>
            <Content content={content} />
        </MainLayout>
    );
};

export default AppSimplePage;
