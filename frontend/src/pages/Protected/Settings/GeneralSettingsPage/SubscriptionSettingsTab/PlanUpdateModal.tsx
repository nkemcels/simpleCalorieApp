import React, { useState } from "react";
import { Input, Modal, Spin } from "antd";
import Button from "antd-button-color";
import Styles from "./SubscriptionSettingsTab.scss";
import CloseIcon from "@ant-design/icons/CloseOutlined";
import classNames from "classnames";
import ChevronRightIcon from "@ant-design/icons/RightOutlined";
import ChevronLeftIcon from "@ant-design/icons/LeftOutlined";
import CheckIcon from "@ant-design/icons/CheckOutlined";
import { Provider, useSelector } from "react-redux";
import { getAppStore } from "../../../../../redux/store";
import { RootState } from "../../../../../redux/reducers";
import { TCurrentPlanInfo } from "../../../../../models/UserSubscription";
import { AppManager } from "../../../../../manager";

const SubscriptionPlanManageView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [saving, setSaving] = useState(false);
    const crPlan = useSelector<RootState, TCurrentPlanInfo>((s) => s.subscriptions.currentPlan);
    const [newNumberOfSeats, setNewNumberOfSeats] = useState(crPlan.seats.quota);
    const handleUpdateSubscription = () => {
        const performAction = () => {
            setSaving(true);
            AppManager.subscription.apiUpdateCurrentPlan(crPlan.plan_id, crPlan.id, { quantity: newNumberOfSeats }, (err) => {
                setSaving(false);
                if (err) AppManager.alert.error("Error", `${err}`);
                else AppManager.alert.toastSuccess("Your subscription was sucessfully updated");
            });
        };
        if (newNumberOfSeats - crPlan.seats.quota > 0) {
            AppManager.alert.confirmAction(
                "Confirm Action",
                "You are about to increase the number of seats for your organization",
                (res) => {
                    performAction();
                },
                { okText: "YES, PROCEED" },
            );
        } else performAction();
    };
    return (
        <div className={Styles.SubscriptionManagementViewContainer}>
            <Button className={Styles.CloseBtn} icon={<CloseIcon />} onClick={onClose} disabled={saving} />
            <Spin spinning={saving} tip="Updating subscription...">
                <div className={Styles.Heading}>Subscription Plan</div>
                <div className={Styles.GeneralInfo}>
                    <div className={Styles.SubscriptionInfo}>
                        <div className={Styles.Title}>Current Plan</div>
                        <div className={Styles.PlanName}>{crPlan.plan.plan_name}</div>
                    </div>
                    <div className={Styles.SeatsInfo}>
                        <div className={Styles.Count}>{crPlan.seats.quota > 9 ? crPlan.seats.quota : `0${crPlan.seats.quota}`}</div>
                        <div className={Styles.Text}>Total Seats</div>
                    </div>
                    <div className={classNames(Styles.SeatsInfo, { [Styles.Used]: true })}>
                        <div className={Styles.Count}>
                            {crPlan.seats.totalConsumed > 9 ? crPlan.seats.totalConsumed : `0${crPlan.seats.totalConsumed}`}
                        </div>
                        <div className={Styles.Text}>Used</div>
                    </div>
                    <div className={classNames(Styles.SeatsInfo, { [Styles.Available]: true })}>
                        <div className={Styles.Count}>{crPlan.seats.totalLeft > 9 ? crPlan.seats.totalLeft : `0${crPlan.seats.totalLeft}`}</div>
                        <div className={Styles.Text}>Available</div>
                    </div>
                </div>
                <div className={Styles.SeatsInputWrapper}>
                    <div>Update Seats</div>
                    <div>
                        <div className={Styles.SeatsInput}>
                            <Button
                                style={{ marginRight: 10 }}
                                type="info"
                                onClick={() => setNewNumberOfSeats((r) => (r - 1 > 0 ? r - 1 : r))}
                                disabled={newNumberOfSeats <= 1}
                            >
                                <ChevronLeftIcon />
                            </Button>
                            <Input className={Styles.Input} value={newNumberOfSeats > 9 ? newNumberOfSeats : `0${newNumberOfSeats}`} />
                            <Button style={{ marginLeft: 10 }} type="info" onClick={() => setNewNumberOfSeats((r) => r + 1)}>
                                Add <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </Spin>
            <div className={Styles.BottomActions}>
                <Button
                    loading={saving}
                    type="primary"
                    icon={<CheckIcon />}
                    disabled={crPlan.seats.quota === newNumberOfSeats}
                    onClick={handleUpdateSubscription}
                >
                    Update Subscription
                </Button>
                <Button disabled={saving} style={{ marginLeft: 10 }} icon={<CloseIcon />} onClick={onClose}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export const showSubscriptionPlanManagementModal = () => {
    const modal = Modal.info({
        icon: null,
        centered: true,
        width: 750,
        content: (
            <Provider store={getAppStore()}>
                <SubscriptionPlanManageView onClose={() => modal.destroy()} />
            </Provider>
        ),
        okButtonProps: { style: { display: "none" } },
    });

    return modal;
};
