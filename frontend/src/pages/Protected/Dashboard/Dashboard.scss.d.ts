declare namespace DashboardScssNamespace {
    export interface IDashboardScss {
        Container: string;
    }
}

declare const DashboardScssModule: DashboardScssNamespace.IDashboardScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DashboardScssNamespace.IDashboardScss;
};

export = DashboardScssModule;
