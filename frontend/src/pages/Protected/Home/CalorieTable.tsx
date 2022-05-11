import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Table, Tag } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { CalorieEntryAction } from "../../../actions/CalorieEntryAction";
import useCurrentDateCalorieEntries from "../../../hooks/useCurrentDateCalorieEntries";
import CalorieEntryPopover from "./CalorieEntryPopover";
import Styles from "./HomePage.scss";

const ExerciseIcon = () => {
    return (
        <span
            style={{ display: "inline-block", width: 18, height: 18, marginRight: 5 }}
            dangerouslySetInnerHTML={{
                __html: `<svg id="Icons_Run" overflow="hidden" version="1.1" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle cx="64.2" cy="13" r="8"/><path d=" M 83.6 24 C 81.6 23 79.2 23.7 78.2 25.7 L 74.7 32.3 L 59.3 22.6 C 58.7 22.2 58 22 57.2 22 L 40.2 22 C 38.7 22 37.4 22.8 36.7 24.1 L 30.2 36.1 C 29.1 38 29.9 40.5 31.8 41.5 C 32.4 41.8 33.1 42 33.7 42 C 35.1 42 36.5 41.2 37.2 39.9 L 42.6 30 L 48.5 30 L 30.8 63 L 14.2 63 C 12 63 10.2 64.8 10.2 67 C 10.2 69.2 12 71 14.2 71 L 33.2 71 C 34.7 71 36 70.2 36.7 68.9 L 43.7 56 L 55.2 66.7 L 54.3 86.8 C 54.1 89 55.8 90.9 58 91 C 58.1 91 58.1 91 58.2 91 C 60.3 91 62.1 89.3 62.2 87.2 L 63.2 65.2 C 63.3 64 62.8 62.9 61.9 62.1 L 52.2 53.1 L 62.4 34.1 L 74 41.4 C 74.9 42 76.1 42.2 77.2 41.9 C 78.3 41.6 79.2 40.9 79.7 39.9 L 85.2 29.4 C 86.3 27.5 85.6 25.1 83.6 24 Z"/></g></svg>`,
            }}
        />
    );
};
const SnackIcon = () => {
    return (
        <span
            style={{ display: "inline-block", width: 18, height: 18, marginRight: 5 }}
            dangerouslySetInnerHTML={{
                __html: `<svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M100,127c7.7,0,14-6.3,14-14h-8c0,3.3-2.7,6-6,6H28c-3.3,0-6-2.7-6-6h-8c0,7.7,6.3,14,14,14H100z"/><path d="M22,59c0-23.2,18.8-42,42-42s42,18.8,42,42h8c0-27.6-22.4-50-50-50S14,31.4,14,59H22z"/><path d="M108,67H93.3L79,81.3L64.7,67H20C9.5,67,1,75.5,1,86s8.5,19,19,19h88c10.5,0,19-8.5,19-19S118.5,67,108,67z M108,97H20   c-6.1,0-11-4.9-11-11s4.9-11,11-11h41.3L79,92.7L96.7,75H108c6.1,0,11,4.9,11,11S114.1,97,108,97z"/><rect height="8" width="8" x="36" y="51.3"/><rect height="8" width="8" x="56" y="33.3"/></g></svg>`,
            }}
        />
    );
};
const BreakfastIcon = () => {
    return (
        <span
            style={{ display: "inline-block", width: 18, height: 18, marginRight: 5 }}
            dangerouslySetInnerHTML={{
                __html: `<svg id="Icons" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
                .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
            </style><line class="st0" x1="3" x2="23" y1="29" y2="29"/><path class="st0" d="M4,11v6.2C4,22,8,26,13,26c5,0,9-4,9-8.8V11H4z"/><path class="st0" d="M25,21L25,21c-1.7,0-3-1.3-3-3v-3c0-1.6,1.3-3,3-3h0c1.6,0,3,1.3,3,3v3C28,19.7,26.7,21,25,21z"/><path class="st0" d="M13,2L13,2c-1.2,1.8-1.2,4.2,0,6l0,0"/><path class="st0" d="M9,2L9,2C7.8,3.8,7.8,6.2,9,8l0,0"/><path class="st0" d="M17,2L17,2c-1.2,1.8-1.2,4.2,0,6l0,0"/></svg>`,
            }}
        />
    );
};
const MealIcon = () => {
    return (
        <span
            style={{ display: "inline-block", width: 18, height: 18, marginRight: 5 }}
            dangerouslySetInnerHTML={{
                __html: `<svg id="Icons" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
                .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
            </style><path class="st0" d="M6.5,13.5c-2.6-2.6-2.6-6.7,0-9.3l11.1,11.1l3.7,3.7l5.7,5.7c1,1,1,2.5,0,3.5l0,0c-1,1-2.8,1-3.7-0.2l-4.1-5.1  c-1-1.3-2.8-1.7-4.4-1.1l0,0L6.5,13.5z"/><line class="st0" x1="21.3" x2="26.7" y1="12.1" y2="6.7"/><path class="st0" d="M19.1,16.8c0.4-0.1,0.7-0.1,1.1-0.2c1.3-0.1,2.8-0.8,4.3-2.3l4.9-4.9"/><path class="st0" d="M12.3,19.3L5.3,25c-1.1,0.8-1.2,2.4-0.2,3.3c1,1,2.5,0.8,3.3-0.2l5.7-7.1"/><path class="st0" d="M24,4L19,8.9c-1.5,1.5-2.3,3-2.3,4.3c0,0.4-0.1,0.7-0.2,1.1"/></svg>`,
            }}
        />
    );
};

const IconsMap = {
    breakfast: <BreakfastIcon />,
    lunch: <MealIcon />,
    dinner: <MealIcon />,
    snack: <SnackIcon />,
    exercise: <ExerciseIcon />,
};

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
                            {IconsMap[rec.entryType]}
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
