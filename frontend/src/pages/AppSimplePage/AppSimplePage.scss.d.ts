declare namespace AppSimplePageScssNamespace {
    export interface IAppSimplePageScss {
        Content: string;
        Header: string;
        LogoWrapper: string;
        Sidebar: string;
    }
}

declare const AppSimplePageScssModule: AppSimplePageScssNamespace.IAppSimplePageScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AppSimplePageScssNamespace.IAppSimplePageScss;
};

export = AppSimplePageScssModule;
