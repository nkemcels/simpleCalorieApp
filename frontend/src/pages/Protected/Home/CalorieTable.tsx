import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { CalorieEntryAction } from "../../../actions/CalorieEntryAction";
import useCurrentDateCalorieEntries from "../../../hooks/useCurrentDateCalorieEntries";
import CalorieEntryPopover from "./CalorieEntryPopover";

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
            columns={[
                { title: "Info", dataIndex: "name" },
                { title: "Type", dataIndex: "entryType" },
                { title: "Calories (kCal)", dataIndex: "calories" },
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
