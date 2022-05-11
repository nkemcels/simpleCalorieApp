declare namespace AppContentScssNamespace {
    export interface IAppContentScss {
        CalendarWrapper: string;
        Container: string;
        ContentContainer: string;
        Desc: string;
        Header: string;
        MainText: string;
        MainWrapper: string;
        PiHeaderSectionInnerView: string;
        Pie: string;
        Section: string;
        TextWrapper: string;
        Unit: string;
        Value: string;
    }
}

declare const AppContentScssModule: AppContentScssNamespace.IAppContentScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AppContentScssNamespace.IAppContentScss;
};

export = AppContentScssModule;
