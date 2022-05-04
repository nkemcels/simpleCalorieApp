import React, { useEffect, useState } from "react";
import { Table, Spin, Tabs, Tag } from "antd";
import { PieChart } from "react-minimal-pie-chart";
import Button from "antd-button-color";
import Styles from "./SubscriptionSettingsTab.scss";
import SectionPane from "../SharedComponents/SectionPane";
import { AppManager } from "../../../../../manager";
import BillingAddressImage from "./ImageIcons";
import classNames from "classnames";
// import Pie from "@ant-design/charts/lib/pie";
import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "../../../../../redux/reducers";
import { showSubscriptionPlanManagementModal } from "./PlanUpdateModal";
import ReloadIcon from "@ant-design/icons/ReloadOutlined";
import { TCurrentPlanInfo } from "../../../../../models/UserSubscription";

const CurrentPlanCard = () => {
    const [error, setError] = useState("");
    const crPlan = useSelector<RootState, any>((s) => s.subscriptions.currentPlan);
    const loading = useSelector<RootState, boolean>((s) => s.subscriptions.loadingCurrentPlan);
    const handleChangePlan = () => {
        showSubscriptionPlanManagementModal();
    };
    useEffect(() => {
        AppManager.subscription.apiFetchCurrentPlan((err) => err && setError(err));
    }, []);
    return (
        <div className={Styles.CurrentPlanBox}>
            {crPlan ? (
                <>
                    <div className={Styles.Heading}>current subscription plan</div>
                    {crPlan.plan.price ? (
                        <div className={Styles.Price}>
                            {`${crPlan.currency_symbol} ${crPlan.plan.price}`}
                            <div className={Styles.PerUser}>/seat/month</div>
                        </div>
                    ) : (
                        <div className={Styles.Price}>Free</div>
                    )}
                    <div className={Styles.Name}>{crPlan.plan.plan_name}</div>
                    <div className={Styles.Icon}>
                        <i className="fa fa-star" />
                    </div>
                    <div className={Styles.ActionsWrapper}>
                        <div>{crPlan.quantity} seats</div>
                        <Button onClick={handleChangePlan}>Manage</Button>
                    </div>
                </>
            ) : loading ? (
                "Loading"
            ) : (
                error && <span style={{ color: "#cf5b5b" }}>Error: {error}</span>
            )}
        </div>
    );
};

const NextBillingCard = () => {
    const crPlan = useSelector<RootState, TCurrentPlanInfo>((s) => s.subscriptions.currentPlan);
    const loading = useSelector<RootState, boolean>((s) => s.subscriptions.loadingCurrentPlan);

    return (
        <div className={Styles.NextBillingBox}>
            {crPlan ? (
                <>
                    <div className={Styles.Heading}>Next Payment</div>
                    <div className={Styles.Price}>
                        {`${crPlan.currency_symbol} ${crPlan.plan.price * crPlan.quantity}`}
                        <div className={Styles.SeatsCount}>(for {crPlan.quantity} total seats)</div>
                    </div>
                    <div className={Styles.Name}>on {moment(crPlan.next_billing_date).format("MMMM DD")}</div>
                    <div className={Styles.Icon}>
                        <i className="fa fa-credit-card" />
                    </div>
                    <div className={Styles.BottomView}>
                        <div>Subscription Status</div>
                        <div>
                            {<Tag color={crPlan.status === "live" ? "green" : "red"}>{crPlan.status === "live" ? "active" : crPlan.status}</Tag>}
                        </div>
                    </div>
                </>
            ) : loading ? (
                "Loading"
            ) : (
                <div className={Styles.Heading}>Next Payment</div>
            )}
        </div>
    );
};

const StorageQuotaView = () => {
    const crPlan = useSelector<RootState, any>((s) => s.subscriptions.currentPlan);
    const loading = useSelector<RootState, boolean>((s) => s.subscriptions.loadingCurrentPlan);
    if (crPlan) {
        console.log("CONSUMED ", (crPlan.storage.totalConsumed / (1024 * 1024 * 1024)).toFixed(1));
        console.log("LEFT ", (crPlan.storage.totalLeft / (1024 * 1024 * 1024)).toFixed(1));
    }

    return (
        <div className={Styles.StorageContainer}>
            <div className={Styles.Header}>
                Storage Quota {crPlan && `(${((crPlan.storage.totalConsumed * 100) / crPlan.storage.quota).toFixed(2)}% used)`}
            </div>
            {/* <div className={Styles.Description}>
                This is a distribution of the amout of storage you have used up for your current subscription plan
            </div> */}
            {crPlan ? (
                <div className={Styles.ChartContainer}>
                    <PieChart
                        style={{ width: 150 }}
                        startAngle={20}
                        data={[
                            { title: "Used", value: +(crPlan.storage.totalConsumed / (1024 * 1024 * 1024)).toFixed(2), color: "#D84315" },
                            { title: "Free", value: +(crPlan.storage.totalLeft / (1024 * 1024 * 1024)).toFixed(2), color: "#00C853" },
                        ]}
                        lineWidth={60}
                        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                        animate
                        label={({ dataEntry }) => (dataEntry.value < 1 ? "" : Math.round(dataEntry.value) + "GB")}
                        labelPosition={70}
                        labelStyle={{
                            fill: "#fff",
                            opacity: 0.75,
                            fontSize: 8,
                            pointerEvents: "none",
                        }}
                    />
                </div>
            ) : (
                loading && "loading..."
            )}
        </div>
    );
};

const SeatsQuotaView = () => {
    const crPlan = useSelector<RootState, any>((s) => s.subscriptions.currentPlan);
    const loading = useSelector<RootState, boolean>((s) => s.subscriptions.loadingCurrentPlan);

    return (
        <div className={Styles.SeatsContainer}>
            <div className={Styles.Header}>
                Seats Quota {crPlan && ` ${crPlan.seats.totalConsumed}/${crPlan.seats.quota}`}{" "}
                {crPlan && `(${((crPlan.seats.totalConsumed * 100) / crPlan.seats.quota).toFixed(1)}% used)`}
            </div>
            {/* <div className={Styles.Description}>The total number of seats left available to invite new members into your organization</div> */}
            {crPlan ? (
                <div className={Styles.ChartContainer}>
                    <PieChart
                        style={{ width: 150 }}
                        startAngle={20}
                        data={[
                            { title: "Used", value: crPlan.seats.totalConsumed, color: "#D84315" },
                            { title: "Left", value: crPlan.seats.totalLeft, color: "#1565C0" },
                        ]}
                        lineWidth={60}
                        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                        animate
                        label={({ dataEntry }) => (dataEntry.value < 1 ? "" : Math.round(dataEntry.value) + " Seats")}
                        labelPosition={70}
                        labelStyle={{
                            fill: "#fff",
                            opacity: 0.75,
                            fontSize: 8,
                            pointerEvents: "none",
                        }}
                    />
                </div>
            ) : (
                loading && "loading..."
            )}
        </div>
    );
};

const BillingAddressView = () => {
    const cstInfo = useSelector<RootState, any>((s) => s.subscriptions.customerInfo);
    const [error, setError] = useState("");
    useEffect(() => {
        AppManager.subscription.apiFetchCustomerInfo((err) => err && setError(err));
    }, []);
    return cstInfo && !!Object.values(cstInfo.billing_address || {}).length ? (
        <div className={Styles.BillingAddressContainer}>
            {/* <div className={Styles.Header}>Billing Address</div> */}
            <div className={Styles.Image}>
                <BillingAddressImage />
            </div>
            <div className={Styles.AddressInfo}>
                {Object.values(cstInfo.billing_address).map((value, ind) => (
                    <div key={`${ind}`} className={Styles.Item}>
                        {`${value}`}
                    </div>
                ))}
            </div>
        </div>
    ) : null;
};

const PaymentMethodsView = () => {
    const [errors, setError] = useState("");
    const paymentMethods = useSelector<RootState, any[]>((s) => s.subscriptions.paymentMethods);
    const loading = useSelector<RootState, boolean>((s) => s.subscriptions.loadingPaymentMethods);
    console.log("PAYMENT METHODS ", paymentMethods);
    useEffect(() => {
        AppManager.subscription.apiFetchPaymentMethods((err) => err && setError(err));
    }, []);
    return !!paymentMethods.length ? (
        <div className={Styles.PaymentMethodsContainer}>
            <div className={Styles.Header}>Payment Methods</div>
            {paymentMethods.map((item, ind) => (
                <div className={Styles.PaymentMethod} key={ind}>
                    {item.type == "stripe" ? "Credit card" : item.type} {item.last_four_digits ? `ending with ${item.last_four_digits}` : ""}
                </div>
            ))}
        </div>
    ) : null;
};

const BillingHistoryView = () => {
    const [errors, setError] = useState("");
    const billingHistory = useSelector<RootState, any[]>((s) => s.subscriptions.billingHistory);
    const loading = useSelector<RootState, boolean>((s) => s.subscriptions.loadingBillingHistory);
    console.log("BILLING HISTORY ", billingHistory);
    useEffect(() => {
        AppManager.subscription.apiFetchBillingHistory((err) => err && setError(err));
    }, []);
    return (
        <Tabs className={Styles.BillingHistoryTabs}>
            <Tabs.TabPane tab="All" key="all">
                <Table
                    className={Styles.BillingHistoryTable}
                    dataSource={billingHistory}
                    loading={loading}
                    columns={[
                        { title: "Date", render: (_, rec) => moment(rec.createdAt).format("DD MMM YYYY [at] HH:mm a") },
                        {
                            title: "Type",
                            dataIndex: "status",
                            render: (value, row) => (
                                <Tag color={value === "debit" || value === "success" ? "orange" : value === "credit" ? "green" : "default"}>
                                    {value === "success" ? "debit" : value}
                                </Tag>
                            ),
                        },
                        {
                            title: "Amount",
                            dataIndex: "amount",
                            render: (value, row) => <div className={Styles.Amount}>{`${row.currency_symbol}${value}`}</div>,
                        },
                        { title: "Description", dataIndex: "description" },
                    ]}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Transactions" key="transactions">
                <Table
                    className={Styles.BillingHistoryTable}
                    dataSource={billingHistory.filter((r) => r.status !== "paid")}
                    loading={loading}
                    columns={[
                        { title: "Date", render: (_, rec) => moment(rec.createdAt).format("DD MMM YYYY [at] HH:mm a") },
                        {
                            title: "Type",
                            dataIndex: "status",
                            render: (value, row) => <Tag color={value === "debit" ? "red" : value === "credit" ? "green" : "default"}>{value}</Tag>,
                        },
                        {
                            title: "Amount",
                            dataIndex: "amount",
                            render: (value, row) => <div className={Styles.Amount}>{`${row.currency_symbol}${value}`}</div>,
                        },
                        { title: "Description", dataIndex: "description" },
                    ]}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Invoice Records" key="invoice">
                <Table
                    className={Styles.BillingHistoryTable}
                    dataSource={billingHistory.filter((r) => r.status === "paid")}
                    loading={loading}
                    columns={[
                        { title: "Date", render: (_, rec) => moment(rec.createdAt).format("DD MMM YYYY [at] HH:mm a") },
                        {
                            title: "Status",
                            dataIndex: "status",
                            render: (value, row) => <Tag color={value === "debit" ? "red" : value === "credit" ? "green" : "default"}>{value}</Tag>,
                        },
                        {
                            title: "Amount",
                            dataIndex: "amount",
                            render: (value, row) => <div className={Styles.Amount}>{`${row.currency_symbol}${value}`}</div>,
                        },
                        { title: "Description", dataIndex: "description" },
                    ]}
                />
            </Tabs.TabPane>
        </Tabs>
    );
};

const SubscriptionSettingsTab = () => {
    const loadingBillingHistory = useSelector<RootState, boolean>((s) => s.subscriptions.loadingBillingHistory);
    const handleRefreshBillingHistory = () => {
        AppManager.subscription.apiFetchBillingHistory((err) => err && AppManager.alert.toastError(`${err}`));
    };
    return (
        <div className={Styles.Container}>
            <div className={Styles.CenterPanel}>
                <div className={Styles.SubscriptionInfoBox}>
                    <CurrentPlanCard />
                    <NextBillingCard />
                </div>
                <SectionPane
                    title="Billing History"
                    content={<BillingHistoryView />}
                    extraActions={
                        <Button
                            onClick={handleRefreshBillingHistory}
                            icon={<ReloadIcon />}
                            disabled={loadingBillingHistory}
                            loading={loadingBillingHistory}
                        >
                            Refresh
                        </Button>
                    }
                />
            </div>
            <div className={Styles.RightPanel}>
                <PaymentMethodsView />
                <BillingAddressView />
                <StorageQuotaView />
                <SeatsQuotaView />
            </div>
        </div>
    );
};

export default SubscriptionSettingsTab;
