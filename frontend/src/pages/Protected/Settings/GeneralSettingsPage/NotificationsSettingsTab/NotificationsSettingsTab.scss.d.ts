declare namespace NotificationsSettingsTabScssNamespace {
    export interface INotificationsSettingsTabScss {
        Container: string;
        ItemCheckbox: string;
        ItemContent: string;
        ItemDescription: string;
        ItemTitle: string;
        NotificationSettingsContainer: string;
        PauseNotfContainer: string;
        Text: string;
    }
}

declare const NotificationsSettingsTabScssModule: NotificationsSettingsTabScssNamespace.INotificationsSettingsTabScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: NotificationsSettingsTabScssNamespace.INotificationsSettingsTabScss;
};

export = NotificationsSettingsTabScssModule;
