import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, notification, Popover } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CalorieEntryAction } from "../../../actions/CalorieEntryAction";
import AppDefaultContent from "../../../containers/AppContent/AppContent";
import { useAppDataSynchronizer } from "../../../hooks/useAppDataSynchronizer";
import { ICalorieEntry } from "../../../models/CalorieEntry";
import { RootState } from "../../../redux/reducers";
import CalorieEntryPopover from "./CalorieEntryPopover";
import CalorieTable from "./CalorieTable";
import Styles from "./HomePage.scss";

const ActionsView = () => {
    const activeDate = useSelector<RootState, Date>((r) => r.calorieEntry.activeDate);
    const today = moment().startOf("day");
    const activeDateIsToday = moment(activeDate).startOf("day").isSame(today);
    return (
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
            <CalorieEntryPopover disabled={!activeDateIsToday} type="breakfast" btnText="BREAKFAST" promptText="What did you eat for breakfast?" />
            <CalorieEntryPopover disabled={!activeDateIsToday} type="lunch" btnText="LUNCH" promptText="What did you eat for lunch?" />
            <CalorieEntryPopover disabled={!activeDateIsToday} type="dinner" btnText="DINNER" promptText="What did you eat for dinner?" />
            <CalorieEntryPopover disabled={!activeDateIsToday} type="snack" btnText="SNACK" promptText="What snack did you take?" />
            <div style={{ display: "inline-block", height: 25, width: 1, background: "#ccc", marginRight: 20 }} />
            <CalorieEntryPopover disabled={!activeDateIsToday} type="exercise" btnText="EXERCISE" promptText="What did you do?" negative />
        </div>
    );
};

const HomePage = () => {
    useAppDataSynchronizer();

    return (
        <AppDefaultContent>
            <ActionsView />
            <Card className={Styles.CalorieTableView}>
                <CalorieTable />
            </Card>
        </AppDefaultContent>
    );
};

export default HomePage;
