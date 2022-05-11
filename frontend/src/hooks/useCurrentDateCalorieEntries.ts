import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CalorieEntryAction } from "../actions/CalorieEntryAction";
import { ICalorieEntry } from "../models/CalorieEntry";
import { RootState } from "../redux/reducers";
import { TCalorieEntryState } from "../redux/services/calorieEntry/reducer";

const useCurrentDateCalorieEntries = () => {
    const [data, setData] = useState<ICalorieEntry[]>([]);
    const currentDate = useSelector<RootState, Date>((r) => r.calorieEntry.activeDate);
    const allEntries = useSelector<RootState, TCalorieEntryState["data"]>((r) => r.calorieEntry.data);
    useEffect(() => {
        setData(CalorieEntryAction.store.getDateEntryData(currentDate) || []);
    }, [currentDate, allEntries]);
    return data;
};

export default useCurrentDateCalorieEntries;
