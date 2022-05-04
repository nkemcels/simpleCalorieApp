import React, { useState } from "react";
import Timeline from "antd/lib/timeline";
import moment from "moment";
import NotificationIcon from "@ant-design/icons/BellFilled";
import OrgAddedIcon from "@ant-design/icons/CheckOutlined";
import Styles from "./DealerGroupItem.scss";
import DefaultStyles from "../GeneralItemStyles.scss";
import { INotification } from "../../../../../models/Notification/Notification";
import classNames from "classnames";
import { AppManager } from "../../../../../manager";
import DefaultDeleteNotfButton from "../DefaultDeleteButton";

type DefaultItemProps = {
    item: INotification<"DEALER_GROUP_ADDED_TO_ORG">;
};

const ItemIcon: React.FC<{ icon?: React.ReactNode; className?: string }> = ({ icon, className }) => {
    return <div className={classNames(Styles.ItemIconContainer, className)}>{icon || <NotificationIcon />}</div>;
};

export const DealerGroupAddedItem: React.FC<DefaultItemProps> = ({ item }) => {
    const handleClick = () => {
        AppManager.route.gotoSettings();
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<OrgAddedIcon />} className={Styles.Assigned} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    The Dealer Group
                    <span className={Styles.ContactName}>{item.data.dGroup.name}</span>
                    now has access to your organization&apos;s data
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};
