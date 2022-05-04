import ActionTypes from "./actionTypes";
import { getAppStore } from "../../store";
import { INotification } from "../../../models/Notification/Notification";

export class NotificationStoreActions {
    static loadingNotifications(loading: boolean) {
        getAppStore().dispatch({ type: ActionTypes.LOADING_NOTIFICATIONS, payload: loading });
    }
    static setNotificationsLoaded(state: boolean) {
        getAppStore().dispatch({ type: ActionTypes.LOADED_NOTIFICATIONS, payload: state });
    }
    static saveNotifications(notifications: INotification[]) {
        getAppStore().dispatch({ type: ActionTypes.SAVE_NOTIFICATIONS, payload: notifications });
    }
    static addNewNotification(notification: INotification) {
        getAppStore().dispatch({ type: ActionTypes.ADD_NEW_NOTIFICATION, payload: notification });
    }
    static removeNotification(notificationId: string) {
        getAppStore().dispatch({ type: ActionTypes.DELETE_NOTIFICATION, payload: notificationId });
    }
    static readAll() {
        getAppStore().dispatch({ type: ActionTypes.READ_ALL_NOTIFICATIONS });
    }
    static getNotifications() {
        return getAppStore().getState().notifications.data;
    }
}
