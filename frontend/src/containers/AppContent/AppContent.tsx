import { Card, Col, Progress, Row } from "antd";
import React from "react";
import Calendar from "react-calendar";
import Styles from "./AppContent.scss";

type AppContentProps = {
    containerRef?: React.RefObject<HTMLDivElement>;
    noContentPadding?: boolean;
    contentPadding?: string | number;
};

type PieHeaderSectionProps = {
    value: number;
    total: number;
    unit: string;
    mainText: string;
    descText: string;
};

const PieHeaderSection: React.FC<PieHeaderSectionProps> = ({ value, total, unit, mainText, descText }) => {
    return (
        <div className={Styles.Section}>
            <div className={Styles.TextWrapper}>
                <span className={Styles.MainText}>{mainText}</span>
                <span className={Styles.Desc}>{descText}</span>
            </div>
            <div className={Styles.Pie}>
                <Progress
                    type="circle"
                    percent={(value * 100) / total}
                    format={(percent) => (
                        <span className={Styles.PiHeaderSectionInnerView}>
                            <span className={Styles.Value}>{value}</span>
                            <span className={Styles.Unit}>{unit}</span>
                        </span>
                    )}
                    strokeWidth={10}
                    size="small"
                    width={55}
                />
            </div>
        </div>
    );
};

const AppDefaultContent: React.FC<AppContentProps> = ({ children, containerRef, noContentPadding, contentPadding = "0 30px 15px 30px" }) => {
    return (
        <>
            <div className={Styles.Container} ref={containerRef}>
                <div className={Styles.Header}>
                    <Row>
                        <Col md={6} sm={12} xs={24}>
                            <PieHeaderSection value={120} total={250} unit="kCal" mainText="Calories" descText="left for today" />
                        </Col>
                        <Col md={6} sm={12} xs={24}>
                            <PieHeaderSection value={120} total={250} unit="kCal" mainText="Calories" descText="burnt" />
                        </Col>
                        <Col md={6} sm={12} xs={24}>
                            <PieHeaderSection value={120} total={250} unit="kCal" mainText="Excercise" descText="today" />
                        </Col>
                        <Col md={6} sm={12} xs={24}>
                            <PieHeaderSection value={120} total={250} unit="kCal" mainText="Weight" descText="10mins ago" />
                        </Col>
                    </Row>
                </div>
                <Row className={Styles.ContentContainer}>
                    <Col md={8} sm={24}>
                        <Card className={Styles.CalendarWrapper}>
                            <Calendar />
                        </Card>
                    </Col>
                    <Col md={16} sm={24}>
                        <div className={Styles.MainWrapper} style={{ padding: noContentPadding ? 0 : contentPadding }}>
                            {children}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default AppDefaultContent;
