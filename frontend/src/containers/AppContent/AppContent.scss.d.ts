declare namespace AppContentScssNamespace {
    export interface IAppContentScss {
        Container: string;
        ContentWrapper: string;
        Header: string;
        HeaderActions: string;
        HeaderContainer: string;
        Icon: string;
        SubHeader: string;
    }
}

declare const AppContentScssModule: AppContentScssNamespace.IAppContentScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AppContentScssNamespace.IAppContentScss;
};

export = AppContentScssModule;
