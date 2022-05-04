import React from "react";
import Timeline from "antd/lib/timeline";
import moment from "moment";
import NotificationIcon from "@ant-design/icons/BellFilled";
import TaskAssignedIcon from "@ant-design/icons/PlusCircleFilled";
import TaskUnassignedIcon from "@ant-design/icons/MinusCircleFilled";
import TaskCompletedIcon from "@ant-design/icons/CheckCircleFilled";
import Styles from "./TaskItem.scss";
import DefaultStyles from "../GeneralItemStyles.scss";
import { INotification } from "../../../../../models/Notification/Notification";
import classNames from "classnames";
import { AppManager } from "../../../../../manager";
import DefaultDeleteNotfButton from "../DefaultDeleteButton";

type DefaultItemProps = {
    item: INotification<"TASK_COMPLETED" | "TASK_ASSIGNED" | "TASK_UNASSIGNED">;
};

const ItemIcon: React.FC<{ icon?: React.ReactNode; className?: string }> = ({ icon, className }) => {
    return <div className={classNames(Styles.ItemIconContainer, className)}>{icon || <NotificationIcon />}</div>;
};

export const TaskAssignedItem: React.FC<DefaultItemProps> = ({ item }) => {
    const handleClick = () => {
        if (item.data.task.projectRef) {
            AppManager.route.gotoSingleProject(item.data.task.projectRef, undefined, { task: item.data.task._id });
        } else {
            AppManager.route.gotoAllTasksAndProjects({ tab: "tasks", item: item.data.task._id });
        }
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<TaskAssignedIcon />} className={Styles.Assigned} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    The task <span className={Styles.TaskName}>{item.data.task.title}</span> has been assigned to you by{" "}
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

export const TaskUnAssignedItem: React.FC<DefaultItemProps> = ({ item }) => {
    const handleClick = () => {
        if (item.data.task.projectRef) {
            AppManager.route.gotoSingleProject(item.data.task.projectRef, undefined, { task: item.data.task._id });
        } else {
            AppManager.route.gotoAllTasksAndProjects({ tab: "tasks", item: item.data.task._id });
        }
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<TaskUnassignedIcon />} className={Styles.Unassigned} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    You have been unassigned from the task <span className={Styles.TaskName}>{item.data.task.title}</span> by
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

export const TaskCompletedItem: React.FC<DefaultItemProps> = ({ item }) => {
    const handleClick = () => {
        if (item.data.task.projectRef) {
            AppManager.route.gotoSingleProject(item.data.task.projectRef, undefined, { task: item.data.task._id });
        } else {
            AppManager.route.gotoAllTasksAndProjects({ tab: "tasks", item: item.data.task._id });
        }
    };
    return (
        <Timeline.Item dot={<ItemIcon icon={<TaskCompletedIcon />} className={Styles.Completed} />} className={DefaultStyles.Container}>
            <div className={Styles.ContentContainer} onClick={handleClick}>
                <div className={Styles.DataContainer}>
                    <span className={Styles.OwnerName}>
                        {item.data.createdBy.firstName} {item.data.createdBy.lastName}
                    </span>
                    has completed the task
                    <span className={Styles.TaskName}>{item.data.task.title}</span> which you assigned to them
                </div>
                <div className={Styles.DateContainer}>{moment(item.createdAt).fromNow()}</div>
            </div>
            <DefaultDeleteNotfButton notfId={item._id} />
        </Timeline.Item>
    );
};
