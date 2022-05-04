declare namespace AppLoadingPageScssNamespace {
    export interface IAppLoadingPageScss {
        Content: string;
        Header: string;
        LogoWrapper: string;
        Sidebar: string;
    }
}

declare const AppLoadingPageScssModule: AppLoadingPageScssNamespace.IAppLoadingPageScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AppLoadingPageScssNamespace.IAppLoadingPageScss;
};

export = AppLoadingPageScssModule;
