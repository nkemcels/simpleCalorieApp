declare namespace AppsTabScssNamespace {
    export interface IAppsTabScss {
        AppContainer: string;
        AppDesc: string;
        AppIcon: string;
        AppName: string;
        Container: string;
        InfoContainer: string;
    }
}

declare const AppsTabScssModule: AppsTabScssNamespace.IAppsTabScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AppsTabScssNamespace.IAppsTabScss;
};

export = AppsTabScssModule;
