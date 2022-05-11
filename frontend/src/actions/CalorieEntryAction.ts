import { AuthStoreActions } from "../redux/services/auth/actions";
import { CustomerStoreActions } from "../redux/services/customer/actions";
import { CalorieEntryStoreActions } from "../redux/services/calorieEntry/actions";
import { HTTPHelper } from "../misc/httpHelper";
import {
    CALORIE_ENTRIES_DATERANGE_QUERY_API,
    CALORIE_ENTRIES_DATE_QUERY_API,
    CALORIE_ENTRY_ITEM_API,
    CALORIE_STATS_API,
    NEW_CALORIE_ENTRY_API,
} from "../constants/apiEndpoints";
import { ICalorieEntry } from "../models/CalorieEntry";
import moment from "moment";

export class CalorieEntryAction {
    static store = CalorieEntryStoreActions;
    static async loadEntries(date: Date = CalorieEntryAction.store.getActiveDate()) {
        const dateStr = moment(date).format("YYYY-MM-DD");
        const resp = await HTTPHelper.get(HTTPHelper.formatUrl(CALORIE_ENTRIES_DATE_QUERY_API, { date: dateStr }));
        CalorieEntryAction.store.saveDateEntries(date, resp.data);
        return resp.data;
    }

    static async loadDateRange(start: Date, end: Date) {
        const startDateStr = moment(start).format("YYYY-MM-DD");
        const endDateStr = moment(end).format("YYYY-MM-DD");
        const resp = await HTTPHelper.get(HTTPHelper.formatUrl(CALORIE_ENTRIES_DATERANGE_QUERY_API, { start: startDateStr, end: endDateStr }));
        return resp.data;
    }

    static async addEntry(data: Partial<ICalorieEntry>) {
        const resp = await HTTPHelper.post(NEW_CALORIE_ENTRY_API, data);
        CalorieEntryAction.store.addDateEntry(resp.data.createdAt, resp.data);
        return resp.data;
    }

    static async updateEntry(entryId: string, data: Partial<ICalorieEntry>, date = CalorieEntryAction.store.getActiveDate()) {
        const resp = await HTTPHelper.put(HTTPHelper.formatUrl(CALORIE_ENTRY_ITEM_API, undefined, { entryId }), data);
        CalorieEntryAction.store.updateDateEntry(date, entryId, data);
        return resp.data;
    }

    static async deleteEntry(entryId: string, date = CalorieEntryAction.store.getActiveDate()) {
        const resp = await HTTPHelper.delete(HTTPHelper.formatUrl(CALORIE_ENTRY_ITEM_API, undefined, { entryId }));
        CalorieEntryAction.store.deleteEntry(date, entryId);
        return resp.data;
    }

    static async refreshCalorieStats(date = CalorieEntryAction.store.getActiveDate()) {
        const dateStr = moment(date).format("YYYY-MM-DDTHH:mm:ss");
        const resp = await HTTPHelper.get(HTTPHelper.formatUrl(CALORIE_STATS_API, { date: dateStr }));
        CalorieEntryAction.store.saveCalorieStats(resp.data);
        return resp.data;
    }
}
