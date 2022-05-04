import { INotification } from "../../../models/Notification/Notification";
import createReducer from "../../utils/createReducer";
import ActionTypes from "./actionTypes";

export type NotificationStateT = {
    data: INotification[];
    loadingNotifications: boolean;
    notificationsLoaded: boolean;
};

export const initialState: NotificationStateT = {
    data: [],
    loadingNotifications: false,
    notificationsLoaded: false,
};

// App Reducer
export default createReducer<NotificationStateT>(initialState, {
    [ActionTypes.SAVE_NOTIFICATIONS]: (state, payload: INotification[]) => ({
        ...state,
        data: payload,
    }),
    [ActionTypes.LOADED_NOTIFICATIONS]: (state, payload: boolean) => ({
        ...state,
        notificationsLoaded: payload,
    }),
    [ActionTypes.LOADING_NOTIFICATIONS]: (state, payload: boolean) => ({
        ...state,
        loadingNotifications: payload,
    }),
    [ActionTypes.DELETE_NOTIFICATION]: (state, payload: string) => ({
        ...state,
        data: state.data.filter((t) => t._id !== payload),
    }),
    [ActionTypes.ADD_NEW_NOTIFICATION]: (state, payload: INotification) => ({
        ...state,
        data: [payload, ...state.data],
    }),
    [ActionTypes.READ_ALL_NOTIFICATIONS]: (state) => ({
        ...state,
        data: state.data.map((r) => ({ ...r, isRead: true })),
    }),

    [ActionTypes.LOGOUT_ACTION]: (state) => ({
        ...state,
        ...initialState,
    }),
});
