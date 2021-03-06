import moment from "moment";
import { ICalorieEntry, ICalorieStats } from "../../../models/CalorieEntry";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type TCalorieEntryState = {
    data: Record<string, ICalorieEntry[] | undefined>;
    activeDate: Date;
    calorieStats?: ICalorieStats;
    currentDataLoaded: boolean;
    loadingDateData: boolean;
};

export const initialState: TCalorieEntryState = {
    data: {},
    activeDate: new Date(),
    currentDataLoaded: false,
    loadingDateData: false,
};

// App Reducer
export default createReducer<TCalorieEntryState>(initialState, {
    [ActionTypes.SAVE_DATE_ENTRIES]: (state, payload: Record<string, ICalorieEntry[] | undefined>) => ({
        ...state,
        data: { ...state.data, ...payload },
        userDataLoaded: true,
    }),

    [ActionTypes.SAVE_CALORIE_STATS]: (state, payload: ICalorieStats) => ({
        ...state,
        calorieStats: payload,
    }),

    [ActionTypes.SET_ACTIVE_DATE]: (state, payload: Date) => ({
        ...state,
        activeDate: payload,
    }),

    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
