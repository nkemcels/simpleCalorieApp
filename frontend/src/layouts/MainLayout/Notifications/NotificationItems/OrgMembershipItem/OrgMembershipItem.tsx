import React from "react";
import Timeline from "antd/lib/timeline";
import moment from "moment";
import NotificationIcon from "@ant-design/icons/BellFilled";
import MemberAddedIcon from "@ant-design/icons/UserAddOutlined";
import MemberRemovedIcon from "@ant-design/icons/WarningFilled";
import Styles from "./OrgMembershipItem.scss";
import DefaultStyles from "../GeneralItemStyles.scss";
import { INotification } from "../../../../../models/Notification/Notification";
import classNames from "classnames";
import DefaultDeleteNotfButton from "../DefaultDeleteButton";
import { AppManager } from "../../../../../manager";

type DefaultItemProps = {
    item: INotification<"ORG_MEMBER_ADDED" | "ORG_MEMBER_REMOVED">;
};

const ItemIcon: React.FC<{ icon?: React.ReactNode; className?: string }> = ({ icon, className }) => {
    return <div className={classNames(Styles.ItemIconContainer, className)}>{icon || <NotificationIcon />}</div>;
};

export const OrgMemberAddedItem: React.FC<DefaultItemProps> = ({ item }) => {
    const orgOwner = AppManager.org.getCurrentActiveOrg()?.data.attrs.owner._id;
    return (
        <Timeline.Item dot={<ItemIcon icon={<MemberAddedIcon />} className={Styles.Assigned} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer}>
                {item.user === orgOwner ? (
                    <div className={Styles.DataContainer}>
                        <span className={Styles.OwnerName}>
                            {item.data.member.user.firstName} {item.data.member.user.lastName}
                        </span>{" "}
                        is now a member of
                        <span className={Styles.OrgName}>{item.data.organization.name}.</span>
                        You might want to assign them a role from the settings area
                    </div>
                ) : (
                    <div className={Styles.DataContainer}>
                        You have been added to the organization
                        <span className={Styles.OrgName}>{item.data.organization.name}</span>
                        by
                        <span className={Styles.OwnerName}>
                            {item.data.createdBy.firstName} {item.data.createdBy.lastName}
                        </span>
                    </div>
                )}
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};

export const OrgMemberRemovedItem: React.FC<DefaultItemProps> = ({ item }) => {
    return (
        <Timeline.Item dot={<ItemIcon icon={<MemberRemovedIcon />} className={Styles.Unassigned} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer}>
                <div className={Styles.DataContainer}>
                    <span className={Styles.OwnerName}>
                        {item.data.createdBy.firstName} {item.data.createdBy.lastName}
                    </span>
                    has removed you from the organization
                    <span className={Styles.OrgName}>{item.data.organization.name}</span>
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};
