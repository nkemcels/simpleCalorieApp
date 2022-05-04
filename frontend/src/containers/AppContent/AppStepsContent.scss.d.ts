declare namespace AppStepsContentScssNamespace {
    export interface IAppStepsContentScss {
        Container: string;
        ContentWrapper: string;
        Header: string;
        HeaderActions: string;
        HeaderContainer: string;
        Icon: string;
        SubHeader: string;
    }
}

declare const AppStepsContentScssModule: AppStepsContentScssNamespace.IAppStepsContentScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AppStepsContentScssNamespace.IAppStepsContentScss;
};

export = AppStepsContentScssModule;
