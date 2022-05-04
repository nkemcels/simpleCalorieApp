import {
    CheckCircleFilled,
    CheckOutlined,
    ClockCircleFilled,
    CloseCircleFilled,
    CloseOutlined,
    Loading3QuartersOutlined as LoadingIcon,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, message, Modal, notification } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { CustomerAction } from "../../../../actions/CustomerAction";
import { RouteAction } from "../../../../actions/RouteAction";
import { ICustomerApplication } from "../../../../models/Customer/Customer";
import Styles from "../CustomerApplications.scss";

const ApplicationStatusActions: React.FC<{ application: ICustomerApplication }> = ({ application }) => {
    const [approving, setApproving] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDeleteApplication = async (prompt = true) => {
        const performAction = async () => {
            try {
                setDeleting(true);
                await CustomerAction.deleteCustomerApplication(application._id);
                message.success("This application is deleted");
                RouteAction.gotoAllCustomerApplications();
            } catch (error) {
                notification.error({ message: "Failed to delete application", description: `${error}` });
            } finally {
                setDeleting(false);
            }
        };

        if (prompt) {
            Modal.confirm({
                title: "Confirm Action",
                content: "Do you want to delete this application forever?",
                okButtonProps: { danger: true },
                okText: "DELETE",
                onOk: performAction,
            });
        } else await performAction();
    };

    const handleApproveApplication = async () => {
        try {
            setApproving(true);
            await CustomerAction.approveCustomerApplication(application._id);
            message.success("Application approved");
        } catch (error) {
            notification.error({ message: "Failed to approve application", description: `${error}` });
        } finally {
            setApproving(false);
        }
    };

    const handleRejectApplication = async () => {
        let rejectReason = "";
        const performAction = async () => {
            try {
                if (!rejectReason.trim()) throw new Error("A reason for rejecting this application is required.");
                setRejecting(true);
                await CustomerAction.rejectCustomerApplication(application._id, rejectReason.trim());
                message.success("Application rejected");
            } catch (error) {
                notification.error({ message: "Failed to reject application", description: `${error}` });
            } finally {
                setRejecting(false);
            }
        };

        Modal.confirm({
            title: "Please write a reason for rejecting this application",
            content: <Input.TextArea rows={7} onChange={(e) => (rejectReason = e.target.value)} />,
            onOk: performAction,
        });
    };

    const handleRejectAndDelete = async () => {
        await handleRejectApplication();
        await handleDeleteApplication(false);
    };

    return application.applicationStatus === "pending" ? (
        <>
            <Button
                style={{ marginRight: 10 }}
                icon={<CheckCircleFilled />}
                onClick={handleApproveApplication}
                disabled={rejecting || approving}
                loading={approving}
                type="primary"
            >
                Approve Application
            </Button>
            <Dropdown.Button
                onClick={handleRejectApplication}
                disabled={approving || rejecting}
                overlay={
                    <Menu>
                        <Menu.Item onClick={handleRejectAndDelete}>Reject and delete</Menu.Item>
                        <Menu.Item onClick={handleRejectApplication}>Reject only</Menu.Item>
                    </Menu>
                }
            >
                {rejecting ? <LoadingIcon spin /> : <CloseCircleFilled />} Reject
            </Dropdown.Button>
        </>
    ) : application.applicationStatus === "approved" ? (
        <div className={classNames(Styles.ApplicationStatus, Styles.Approved)}>
            <CheckCircleFilled style={{ marginRight: 5 }} /> Approved
        </div>
    ) : (
        <>
            <div className={classNames(Styles.ApplicationStatus, Styles.Rejected)}>
                <CloseCircleFilled style={{ marginRight: 5 }} /> Rejected
            </div>
            <Button style={{ marginLeft: 10 }} loading={deleting} onClick={() => handleDeleteApplication(true)}>
                Delete
            </Button>
        </>
    );
};

export default ApplicationStatusActions;
