import { ICalorieEntry } from "../../../models/CalorieEntry";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type TCalorieEntryState = {
    data: Record<string, ICalorieEntry[] | undefined>;
    activeDate: Date;
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

    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
