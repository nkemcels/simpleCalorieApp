import React, { useState } from "react";
import { Button } from "antd";
import classNames from "classnames";
import Styles from "./GeneralItemStyles.scss";

const DefaultDeleteNotfButton: React.FC<{ notfId: string; className?: string }> = ({ notfId, className }) => {
    const [deleting, setDeleting] = useState(false);
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleting(true);
        // AppManager.notifications.apiDeleteSingleNotification(notfId, (err) => {
        //     setDeleting(false);
        //     if (err) AppManager.alert.toastError(`${err}`);
        // });
    };
    return (
        <Button
            onClick={handleClick}
            loading={deleting}
            size="small"
            type="primary"
            danger
            className={classNames(Styles.DeleteBtn, { [Styles.Deleting]: deleting })}
        >
            {deleting ? "Deleting..." : "Delete"}
        </Button>
    );
};

export default DefaultDeleteNotfButton;
