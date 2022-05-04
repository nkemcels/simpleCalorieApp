import React from "react";
import Timeline from "antd/lib/timeline";
import moment from "moment";
import NotificationIcon from "@ant-design/icons/BellFilled";
import Styles from "./DefaultItem.scss";
import DetaultStyles from "../GeneralItemStyles.scss";
import { INotification } from "../../../../../models/Notification/Notification";
import DefaultDeleteNotfButton from "../DefaultDeleteButton";
import WarningFilled from "@ant-design/icons/WarningFilled";

type DefaultItemProps = {
    item: INotification;
};

const ItemIcon: React.FC<{ icon?: React.ReactNode }> = ({ icon }) => {
    return <div className={Styles.ItemIconContainer}>{icon || <NotificationIcon />}</div>;
};

const DefaultItem: React.FC<DefaultItemProps> = ({ item }) => {
    return (
        <Timeline.Item dot={<ItemIcon />} className={DetaultStyles.Container}>
            <div className={Styles.ContentContainer}>
                <div className={Styles.DataContainer}>
                    {typeof item.data === "string" ? item.data : "<Notification display format not available for current ausplan version>"}
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};

export const ErrorDefaultItem: React.FC<{ id: string; message: string; date: string }> = ({ id, message, date }) => {
    return (
        <Timeline.Item dot={<ItemIcon icon={<WarningFilled style={{ color: "#b71c1c" }} />} />} className={DetaultStyles.Container}>
            <div className={Styles.ContentContainer}>
                <div className={Styles.DataContainer}>{message}</div>
                <div className={Styles.DateContainer}>{moment(date).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={id} />
        </Timeline.Item>
    );
};

export default DefaultItem;
