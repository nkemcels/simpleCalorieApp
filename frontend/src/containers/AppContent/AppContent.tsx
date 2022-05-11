import { Button, Card, Col, Input, InputNumber, message, notification, Popover, Progress, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { UserAction } from "../../actions/UserAction";
import { ICalorieStats } from "../../models/CalorieEntry";
import { IUserData } from "../../models/User";
import { RootState } from "../../redux/reducers";
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
    mainText: React.ReactNode;
    descText?: React.ReactNode;
    strokeColor?: string;
};

const PieHeaderSection: React.FC<PieHeaderSectionProps> = ({ value, total, unit, mainText, descText, strokeColor }) => {
    return (
        <div className={Styles.Section}>
            <div className={Styles.TextWrapper}>
                <span className={Styles.MainText}>{mainText}</span>
                {descText && <span className={Styles.Desc}>{descText}</span>}
            </div>
            <div className={Styles.Pie}>
                <Progress
                    type="circle"
                    percent={(value * 100) / total}
                    strokeColor={strokeColor}
                    format={(percent) => (
                        <span className={Styles.PiHeaderSectionInnerView}>
                            <span className={Styles.Value} style={{ color: strokeColor }}>
                                {value.toFixed(0)}
                            </span>
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

const CheckInWeight = () => {
    const userData = useSelector<RootState, IUserData | undefined>((r) => r.user.userData);
    const [weight, setWeight] = useState<number>();
    const [saving, setSaving] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleSave = async () => {
        try {
            setSaving(true);
            await UserAction.updateUserData({ weight });
            setVisible(false);
            message.success("Done");
        } catch (error) {
            notification.error({ message: "Failed to check in new weight", description: `${error}` });
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        setWeight(userData?.weight);
    }, [userData?.weight]);
    return (
        <Popover
            title="What is your new weight"
            placement="bottom"
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <div style={{ padding: 20 }}>
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="New weight value in Kg..."
                        value={weight}
                        onChange={setWeight}
                        min={2}
                        max={1000}
                    />
                    <Button
                        style={{ marginTop: 20, width: "100%" }}
                        type="primary"
                        disabled={!weight || saving}
                        loading={saving}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <Button size="small" style={{ marginTop: 5 }}>
                Check in
            </Button>
        </Popover>
    );
};

const AppDefaultContent: React.FC<AppContentProps> = ({ children, containerRef, noContentPadding, contentPadding = "0 30px 15px 30px" }) => {
    const calorieStats = useSelector<RootState, ICalorieStats | undefined>((r) => r.calorieEntry.calorieStats);
    const activeDate = useSelector<RootState, Date>((r) => r.calorieEntry.activeDate);
    const today = moment().startOf("day");
    const activeDateIsToday = moment(activeDate).startOf("day").isSame(today);
    const userData = useSelector<RootState, IUserData | undefined>((r) => r.user.userData);
    return (
        <>
            <div className={Styles.Container} ref={containerRef}>
                {activeDateIsToday && calorieStats && (
                    <div className={Styles.Header}>
                        <Row>
                            <Col md={8} sm={12} xs={24}>
                                <PieHeaderSection
                                    value={calorieStats.caloriesLeft}
                                    total={calorieStats.totalCalories}
                                    unit="kCal"
                                    mainText="Calories"
                                    descText="you have left"
                                />
                            </Col>
                            <Col md={8} sm={12} xs={24}>
                                <PieHeaderSection
                                    value={calorieStats.burntCalories}
                                    total={calorieStats.totalCalories}
                                    strokeColor="red"
                                    unit="kCal"
                                    mainText="Calories"
                                    descText="burnt"
                                />
                            </Col>
                            {userData && (
                                <Col md={8} sm={12} xs={24}>
                                    <PieHeaderSection
                                        value={userData.weight}
                                        total={userData.weight}
                                        unit="Kg"
                                        mainText="Weight"
                                        descText={<CheckInWeight />}
                                    />
                                </Col>
                            )}
                        </Row>
                    </div>
                )}
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
