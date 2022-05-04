import { Col, Row } from "antd";
import classNames from "classnames";
import React from "react";
import Logo from "../../components/Logo/Logo";
import Styles from "./BasicHeaderLayout.scss";

type LayoutProps = {
    content?: React.ReactNode;
    title: string;
    noInnerPadding?: boolean;
};

const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className={Styles.HeaderContainer}>
            <div className={Styles.LogoWrapper}>
                <Logo type="with-text-right" imgStyle={{ width: 40, height: 40 }} />
            </div>
            <div className={Styles.Title}>{title}</div>
            <div />
        </div>
    );
};

const BasicHeaderLayout: React.FC<LayoutProps> = ({ content, title, noInnerPadding, children }) => {
    return (
        <div className={classNames(Styles.Container, Styles.FancyBg)}>
            <Header title={title} />
            <div className={Styles.Content} style={{ padding: noInnerPadding ? 0 : undefined }}>
                <Row className="match-parent">
                    {!noInnerPadding && <Col sm={0} md={2} />}
                    <Col sm={24} md={noInnerPadding ? 24 : 20} className="match-parent">
                        <div className={Styles.InnerContent}>{content || children}</div>
                    </Col>
                    {!noInnerPadding && <Col sm={0} md={2} />}
                </Row>
            </div>
        </div>
    );
};

export default BasicHeaderLayout;
