declare namespace NotificationsScssNamespace {
    export interface INotificationsScss {
        Icon: string;
        NotfBtnContainer: string;
        NotfListContainer: string;
        NotfPopContainer: string;
        NotfPopTitle: string;
        Placeholder: string;
        Text: string;
        TotalCount: string;
    }
}

declare const NotificationsScssModule: NotificationsScssNamespace.INotificationsScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: NotificationsScssNamespace.INotificationsScss;
};

export = NotificationsScssModule;
