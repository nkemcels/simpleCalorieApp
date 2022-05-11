import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, notification, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { CalorieEntryAction } from "../../../actions/CalorieEntryAction";
import AppDefaultContent from "../../../containers/AppContent/AppContent";
import { ICalorieEntry } from "../../../models/CalorieEntry";
import CalorieTable from "./CalorieTable";
import Styles from "./HomePage.scss";

type CalorieEntryPopoverProps = {
    type: ICalorieEntry["entryType"];
    btnText?: string;
    promptText?: string;
    trigger?: React.ReactNode;
    editData?: ICalorieEntry;

    // whether or not the calorie entry was an intake (negative=false)
    // or useage (negative=true), like during an exercise
    negative?: boolean;
};

const CalorieEntryPopover: React.FC<CalorieEntryPopoverProps> = ({ type, trigger, btnText, promptText, negative, editData }) => {
    const [visible, setVisible] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSaveEntry = async (data: Partial<ICalorieEntry>) => {
        try {
            setSaving(true);
            data.calories = Number(data.calories) * (negative ? -1 : 1);
            data.entryType = type;
            if (editData) await CalorieEntryAction.updateEntry(editData._id, data);
            else await CalorieEntryAction.addEntry(data);
            setVisible(false);
            message.info(`Entry for ${type} saved!`);
        } catch (error) {
            notification.error({ message: `Failed to add ${type} entry`, description: `${error}` });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Popover
            placement="bottom"
            trigger="click"
            title="New Calorie Entry"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <div className={Styles.CalorieEntryPopoverContent} key={`${visible}`}>
                    <Form layout="vertical" onFinish={handleSaveEntry} initialValues={editData}>
                        <Form.Item name="name" label={promptText} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="calories" label="Calories (in kCal)" rules={[{ required: true }]}>
                            <Input addonAfter="kCal" />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ width: "100%" }} type="primary" disabled={saving} loading={saving} htmlType="submit">
                                {saving ? "Saving..." : "Save"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            }
        >
            {trigger || (
                <Button style={{ marginRight: 20, borderRadius: 15, minWidth: 120 }} icon={<PlusOutlined />}>
                    {btnText}
                </Button>
            )}
        </Popover>
    );
};

const ActionsView = () => {
    return (
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
            <CalorieEntryPopover type="breakfast" btnText="BREAKFAST" promptText="What did you eat for breakfast?" />
            <CalorieEntryPopover type="lunch" btnText="LUNCH" promptText="What did you eat for lunch?" />
            <CalorieEntryPopover type="dinner" btnText="DINNER" promptText="What did you eat for dinner?" />
            <CalorieEntryPopover type="snack" btnText="SNACK" promptText="What snack did you take?" />
            <div style={{ display: "inline-block", height: 25, width: 1, background: "#ccc", marginRight: 20 }} />
            <CalorieEntryPopover type="exercise" btnText="EXERCISE" promptText="What did you do?" negative />
        </div>
    );
};

const HomePage = () => {
    const handleRefreshCalorieStats = () => CalorieEntryAction.refreshCalorieStats(new Date());

    useEffect(() => {
        CalorieEntryAction.loadEntries();
    }, []);

    useEffect(() => {
        // refresh the calorie stats every 5mins
        // because the user's bmr reduces over time.
        handleRefreshCalorieStats();
        const intv = setInterval(handleRefreshCalorieStats, 5 * 60 * 1000);
        return () => clearInterval(intv);
    }, []);

    return (
        <AppDefaultContent>
            <ActionsView />
            <Card className={Styles.CalorieTableView}>
                <CalorieTable />
            </Card>
            <Card>
                <CalorieTable />
            </Card>
        </AppDefaultContent>
    );
};

export default HomePage;
