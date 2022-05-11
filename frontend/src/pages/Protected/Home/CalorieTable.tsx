import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Table, Tag } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { CalorieEntryAction } from "../../../actions/CalorieEntryAction";
import useCurrentDateCalorieEntries from "../../../hooks/useCurrentDateCalorieEntries";
import { BreakfastIcon, CalorieEntryIconsMap, ExerciseIcon, MealIcon, SnackIcon } from "./CalorieEntryIcons";
import CalorieEntryPopover from "./CalorieEntryPopover";
import Styles from "./HomePage.scss";

const CalorieTable = () => {
    const data = useCurrentDateCalorieEntries();
    const [deleting, setDeleting] = useState<string>();
    const handleDeleteEntry = async (entryId: string) => {
        try {
            setDeleting(entryId);
            await CalorieEntryAction.deleteEntry(entryId);
            message.success("Entry deleted!");
        } catch (error) {
            notification.error({ message: "Failed to delete entry", description: `${error}` });
        } finally {
            setDeleting(undefined);
        }
    };
    return (
        <Table
            dataSource={data}
            pagination={{ pageSize: 5 }}
            className={Styles.CalorieTable}
            rowClassName={(rec) => (rec.calories > 0 ? Styles.PositiveCalorieRow : rec.calories < 0 ? Styles.NegativeCalorieRow : undefined)}
            columns={[
                {
                    title: "Info",
                    render: (_, rec) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {CalorieEntryIconsMap[rec.entryType]}
                            {rec.name}
                        </div>
                    ),
                },
                { title: "Type", dataIndex: "entryType" },
                {
                    title: "Calories (kCal)",
                    render: (_, rec) => (
                        <Tag style={{ minWidth: 50, textAlign: "center" }} color={rec.calories < 0 ? "red" : rec.calories > 0 ? "green" : "default"}>
                            {Math.abs(rec.calories)}
                        </Tag>
                    ),
                },
                { title: "Time", render: (_, rec) => moment(rec.createdAt).format("hh:mm a") },
                {
                    render: (_, rec) => (
                        <>
                            <CalorieEntryPopover
                                type={rec.entryType}
                                trigger={<Button icon={<EditOutlined />} size="small" disabled={!!deleting} style={{ marginRight: 7 }} />}
                                editData={rec}
                                placement="bottomLeft"
                            />
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                danger
                                onClick={() => handleDeleteEntry(rec._id)}
                                disabled={!!deleting}
                                loading={deleting === rec._id}
                            />
                        </>
                    ),
                },
            ]}
        />
    );
};

export default CalorieTable;
