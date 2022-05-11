import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, notification, Popover, PopoverProps } from "antd";
import React, { useEffect, useState } from "react";
import { CalorieEntryAction } from "../../../actions/CalorieEntryAction";
import { ICalorieEntry } from "../../../models/CalorieEntry";
import Styles from "./HomePage.scss";

type CalorieEntryPopoverProps = {
    type: ICalorieEntry["entryType"];
    btnText?: string;
    promptText?: string;
    trigger?: React.ReactNode;
    editData?: ICalorieEntry;
    placement?: PopoverProps["placement"];
    disabled?: boolean;

    // whether or not the calorie entry was an intake (negative=false)
    // or useage (negative=true), like during an exercise
    negative?: boolean;
};

function isNumeric(str: any) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

const CalorieEntryPopover: React.FC<CalorieEntryPopoverProps> = ({ type, trigger, btnText, promptText, placement, negative, editData, disabled }) => {
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
            placement={placement || "bottom"}
            trigger="click"
            title={editData ? "Update Calorie Entry" : "New Calorie Entry"}
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <div className={Styles.CalorieEntryPopoverContent} key={`${visible}`}>
                    <Form layout="vertical" onFinish={handleSaveEntry} initialValues={editData}>
                        <Form.Item name="name" label={promptText} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="calories"
                            label="Calories (in kCal)"
                            requiredMark
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator: (_, val) =>
                                        isNumeric(getFieldValue("calories"))
                                            ? Number(getFieldValue("calories")) < 0
                                                ? Promise.reject("Negative values are not allowed")
                                                : Promise.resolve()
                                            : Promise.reject("Invalid calorie value"),
                                }),
                            ]}
                        >
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
                <Button style={{ marginRight: 20, borderRadius: 15, minWidth: 120 }} icon={<PlusOutlined />} disabled={disabled}>
                    {btnText}
                </Button>
            )}
        </Popover>
    );
};

export default CalorieEntryPopover;
