declare namespace HomePageScssNamespace {
    export interface IHomePageScss {
        CalorieTableView: string;
        Container: string;
    }
}

declare const HomePageScssModule: HomePageScssNamespace.IHomePageScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: HomePageScssNamespace.IHomePageScss;
};

export = HomePageScssModule;
