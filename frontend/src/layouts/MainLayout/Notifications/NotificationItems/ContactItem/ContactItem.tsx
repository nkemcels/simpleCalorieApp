import React, { useState } from "react";
import Timeline from "antd/lib/timeline";
import moment from "moment";
import NotificationIcon from "@ant-design/icons/BellFilled";
import ContactAssignedIcon from "@ant-design/icons/UserAddOutlined";
import ContactUnassignedIcon from "@ant-design/icons/UserDeleteOutlined";
import ContactIcon from "@ant-design/icons/UserOutlined";
import DocSignedIcon from "@ant-design/icons/FileProtectOutlined";
import Styles from "./ContactItem.scss";
import DefaultStyles from "../GeneralItemStyles.scss";
import { INotification } from "../../../../../models/Notification/Notification";
import classNames from "classnames";
import { AppManager } from "../../../../../manager";
import DefaultDeleteNotfButton from "../DefaultDeleteButton";
import { ContactUtils } from "../../../../../models/Contact/Utils";

type IndividualItemProps = {
    item: INotification<"CONTACT_ASSIGNED" | "CONTACT_UNASSIGNED" | "CONTACT_REGISTRATION_COMPLETED" | "DOCUMENT_SIGNED">;
};

type DocSignedItemProps = {
    item: INotification<"DOCUMENT_SIGNED">;
};

const ItemIcon: React.FC<{ icon?: React.ReactNode; className?: string }> = ({ icon, className }) => {
    return <div className={classNames(Styles.ItemIconContainer, className)}>{icon || <NotificationIcon />}</div>;
};

export const ContactAssignedItem: React.FC<IndividualItemProps> = ({ item }) => {
    const handleClick = () => {
        AppManager.route.gotoSingleIndividual(item.data.contact._id);
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<ContactAssignedIcon />} className={Styles.Assigned} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    The contact
                    <span className={Styles.ContactName}>{ContactUtils.getDisplayName(item.data.contact)}</span>
                    has been assigned to you by
                    <span className={Styles.OwnerName}>
                        {item.data.createdBy.firstName} {item.data.createdBy.lastName}
                    </span>
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};

export const ContactUnAssignedItem: React.FC<IndividualItemProps> = ({ item }) => {
    const handleClick = () => {
        AppManager.route.gotoSingleIndividual(item.data.contact._id);
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<ContactUnassignedIcon />} className={Styles.Unassigned} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    <span className={Styles.OwnerName}>
                        {item.data.createdBy.firstName} {item.data.createdBy.lastName}
                    </span>
                    has unassigned you from the contact
                    <span className={Styles.ContactName}>{ContactUtils.getDisplayName(item.data.contact)}</span>
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};

export const ContactDocumentSignedItem: React.FC<DocSignedItemProps> = ({ item }) => {
    const handleClick = () => {
        AppManager.route.gotoSingleIndividual(item.data.contact._id);
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<DocSignedIcon />} className={Styles.Completed} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    <span className={Styles.ContactName}>{ContactUtils.getDisplayName(item.data.contact)}</span>
                    has completed and signed the document <span className={Styles.ContactName}>{item.data.document.name}</span>
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};

export const ContactRegCompleteItem: React.FC<IndividualItemProps> = ({ item }) => {
    const handleClick = () => {
        AppManager.route.gotoSingleIndividual(item.data.contact._id);
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<ContactIcon />} className={Styles.Completed} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    <span className={Styles.ContactName}>{ContactUtils.getDisplayName(item.data.contact)}</span>
                    has completed their self-registration
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};
