import ActionTypes from "./actionTypes";
import { getAppStore } from "../../store";
import { ICalorieEntry, ICalorieStats } from "../../../models/CalorieEntry";
import moment from "moment";

const getDateKeyStr = (date: moment.MomentInput) => moment(date).format("DD-MM-YYYY");

export class CalorieEntryStoreActions {
    /**
     * Saves the entries of the specified date.
     */
    static saveDateEntries(date: moment.MomentInput, entries: ICalorieEntry[]) {
        console.log("SAVING AS ", getDateKeyStr(date));
        const entryRecord = { [getDateKeyStr(date)]: entries };
        getAppStore().dispatch({ type: ActionTypes.SAVE_DATE_ENTRIES, payload: entryRecord });
    }

    /**
     * Adds an entry to the entries of the specified date.
     */
    static addDateEntry(date: moment.MomentInput, entry: ICalorieEntry) {
        const entries = CalorieEntryStoreActions.getDateEntryData(date) || [];
        CalorieEntryStoreActions.saveDateEntries(date, [entry, ...entries]);
    }

    /**
     * Updates an entry in the current active date.
     */
    static updateDateEntry(date: moment.MomentInput, entryId: string, data: Partial<ICalorieEntry>) {
        let entries = CalorieEntryStoreActions.getDateEntryData(date);
        if (entries) {
            entries = entries.map((t) => (t._id === entryId ? { ...t, ...data } : t));
            CalorieEntryStoreActions.saveDateEntries(date, entries);
        }
    }

    /**
     * Deletes an entry from the current active date.
     */
    static deleteEntry(date: moment.MomentInput, entryId: string) {
        let entries = CalorieEntryStoreActions.getDateEntryData(date);
        if (entries) {
            entries = entries.filter((t) => t._id !== entryId);
            CalorieEntryStoreActions.saveDateEntries(date, entries);
        }
    }

    /**
     * Returns the entries of the current active date.
     */
    static getDateEntryData(date: moment.MomentInput) {
        return getAppStore().getState().calorieEntry.data[getDateKeyStr(date)];
    }

    /**
     * Saves the calorie stats for the current day (today).
     */
    static saveCalorieStats(stats: ICalorieStats) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_CALORIE_STATS, payload: stats });
    }

    static setActiveDate(date: Date) {
        getAppStore().dispatch({ type: ActionTypes.SET_ACTIVE_DATE, payload: date });
    }

    static getActiveDate() {
        return getAppStore().getState().calorieEntry.activeDate;
    }

    static getCalorieStats() {
        return getAppStore().getState().calorieEntry.calorieStats;
    }
}
