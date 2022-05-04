import React, { useEffect, useState } from "react";
import Badge from "antd/lib/badge";
import Popover from "antd/lib/popover";
import Timeline from "antd/lib/timeline";
import NotfIcon from "@ant-design/icons/BellFilled";
import Styles from "./Notifications.scss";
import DefaultItem, { ErrorDefaultItem } from "./NotificationItems/DefaultItem/DefaultItem";
import { TNotificationItem, NotificationTypes, INotification } from "../../../models/Notification/Notification";
import { Button } from "antd";
import ClearIcon from "@ant-design/icons/CloseOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import noNotfImg from "../../../assets/img/no_notifications.png";

/**
 * Props for the {@link NotificationButton} Component
 */
export type NotificationButtonProps = {
    /**
     * The number of notifications
     */
    count?: number;
    onClick?: () => void;
};

/**
 * Props for the {@link NotificationsList} Component
 */
export type NotificationsListProps = {
    /**
     * All notifications
     */
    items: INotification[];
    total: number;
};

/**
 * Props for the {@link NotificationItem} Component
 */
export type NotificationItemProps = {
    /**
     * A single notification item
     */
    item: INotification;
};

/**
 * Displays the notification bell alongside the number of notifications
 *
 * ### Usage
 * ```js
 * <NotificationButton count={10} onClick={()=>{...}}/>
 * ```
 *
 * ### Props
 * {@link NotificationButtonProps}
 */
export const NotificationButton: React.FC<NotificationButtonProps> = ({ count, onClick }) => {
    return (
        <div className={Styles.NotfBtnContainer} onClick={onClick}>
            <Badge count={count} size="small">
                <NotfIcon className={Styles.Icon} />
            </Badge>
        </div>
    );
};

/**
 * Renders a single item in the {@link NotificationsList} Component.
 * Depending on the notification type, It renders a different notification item.
 *
 * ### Usage
 * ```js
 * <NotificationItem item={...} />
 * ```
 *
 * ### Props
 * {@link NotificationItemProps}
 *
 * #### All Notification Types and Corresponding Notification Item Components:
 * `TASK_COMPLETE`: {@link DefaultItem}
 * *<DEFAULT NOTIFICATION>*: {@link DefaultItem}
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
    switch (item.type) {
        // case "TASK_COMPLETED":
        //     return <TaskCompletedItem item={item as INotification<"TASK_COMPLETED">} />;
        // case "TASK_ASSIGNED":
        //     return <TaskAssignedItem item={item as INotification<"TASK_ASSIGNED">} />;
        // case "TASK_UNASSIGNED":
        //     return <TaskUnAssignedItem item={item as INotification<"TASK_UNASSIGNED">} />;
        // case "CONTACT_ASSIGNED":
        //     return <ContactAssignedItem item={item as INotification<"CONTACT_ASSIGNED">} />;
        // case "CONTACT_UNASSIGNED":
        //     return <ContactUnAssignedItem item={item as INotification<"CONTACT_UNASSIGNED">} />;
        // case "ORG_MEMBER_ADDED":
        //     return <OrgMemberAddedItem item={item as INotification<"ORG_MEMBER_ADDED">} />;
        // case "ORG_MEMBER_REMOVED":
        //     return <OrgMemberRemovedItem item={item as INotification<"ORG_MEMBER_REMOVED">} />;
        // case "DOCUMENT_SIGNED":
        //     return <ContactDocumentSignedItem item={item as INotification<"DOCUMENT_SIGNED">} />;
        // case "CONTACT_REGISTRATION_COMPLETED":
        //     return <ContactRegCompleteItem item={item as INotification<"CONTACT_REGISTRATION_COMPLETED">} />;
        // case "DEALER_GROUP_ADDED_TO_ORG":
        //     return <DealerGroupAddedItem item={item as INotification<"DEALER_GROUP_ADDED_TO_ORG">} />;
        // case "USER_MAIL_LOOP_ERROR":
        //     return <ErrorDefaultItem message={(item as INotification<"USER_MAIL_LOOP_ERROR">).data.message} date={item.createdAt} id={item._id} />;
        default:
            return <DefaultItem item={item} />;
    }
};

/**
 * Displays a list of notifications
 *
 * ### Usage
 * ```js
 * <NotificationsList items={...} />
 * ```
 *
 * ### Props
 * {@link NotificationsListProps}
 */
const NotificationsList: React.FC<NotificationsListProps> = ({ items, total }) => {
    return (
        <div className={Styles.NotfListContainer}>
            {!!total ? (
                <Timeline>
                    {items.map((t) => (
                        <NotificationItem key={t._id} item={t} />
                    ))}
                </Timeline>
            ) : (
                <div className={Styles.Placeholder}>
                    <img src={noNotfImg} />
                    <div className={Styles.Text}>No notifications</div>
                </div>
            )}
        </div>
    );
};

/**
 * Shows notification bell which on click displays a list of the user's notifications.
 * If user is not logged in, this is not shown.
 *
 * ### Usage
 * ```js
 * <Notifications />
 * ```
 */
export const Notifications = () => {
    const notifications = useSelector<RootState, INotification[]>((s) => s.notifications.data);
    const unreadCount = notifications.filter((r) => !r.isRead).length;
    const notificationsCount = notifications.length;
    const [showNotf, setShowNotf] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleClearAllNotifications = () => {
        // setDeleting(true);
        // AppManager.notifications.apiDeleteAllNotifications((err) => {
        //     setDeleting(false);
        //     if (err) AppManager.alert.toastError(`${err}`);
        // });
    };
    useEffect(() => {
        if (showNotf) {
            // AppManager.notifications.apiMarkAllNotificationsAsRead(() => {});
        }
    }, [showNotf]);
    return (
        <Popover
            overlayClassName={Styles.NotfPopContainer}
            content={<NotificationsList items={notifications} total={notificationsCount} />}
            visible={showNotf}
            onVisibleChange={setShowNotf}
            title={
                notificationsCount !== 0 && (
                    <div className={Styles.NotfPopTitle}>
                        <span>
                            Notifications <span className={Styles.TotalCount}>{notificationsCount}</span>
                        </span>
                        <Button icon={<ClearIcon />} loading={deleting} type="link" danger onClick={handleClearAllNotifications}>
                            Clear All
                        </Button>
                    </div>
                )
            }
            trigger="click"
        >
            <div data-feature="notification">
                <NotificationButton count={unreadCount} onClick={() => setShowNotf((r) => !r)} />
            </div>
        </Popover>
    );
};

export default Notifications;
