import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CalorieEntryAction } from "../actions/CalorieEntryAction";
import { ICalorieEntry } from "../models/CalorieEntry";
import { IUserData } from "../models/User";
import { RootState } from "../redux/reducers";
import { TCalorieEntryState } from "../redux/services/calorieEntry/reducer";

export const useAppDataSynchronizer = () => {
    const activeDate = useSelector<RootState, Date>((r) => r.calorieEntry.activeDate);
    const userData = useSelector<RootState, IUserData | undefined>((r) => r.user.userData);
    const calorieEntries = useSelector<RootState, TCalorieEntryState["data"]>((r) => r.calorieEntry.data);

    const handleLoadCalorieEntries = () => CalorieEntryAction.loadEntries();

    const handleRefreshCalorieStats = () => CalorieEntryAction.refreshCalorieStats(new Date());

    useEffect(() => {
        handleLoadCalorieEntries();
    }, [activeDate]);

    useEffect(() => {
        handleRefreshCalorieStats();
    }, [userData?.weight, calorieEntries]);

    useEffect(() => {
        // refresh the calorie stats every 5mins
        // because the user's bmr reduces over time.
        handleRefreshCalorieStats();
        const intv = setInterval(handleRefreshCalorieStats, 5 * 60 * 1000);
        return () => clearInterval(intv);
    }, []);

    useEffect(() => {
        CalorieEntryAction.loadEntries();
    }, []);
};
