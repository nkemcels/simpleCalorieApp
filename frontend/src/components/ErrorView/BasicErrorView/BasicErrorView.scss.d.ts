declare namespace BasicErrorViewScssNamespace {
    export interface IBasicErrorViewScss {
        Container: string;
        ErrorDescription: string;
        ErrorImg: string;
        ErrorText: string;
    }
}

declare const BasicErrorViewScssModule: BasicErrorViewScssNamespace.IBasicErrorViewScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: BasicErrorViewScssNamespace.IBasicErrorViewScss;
};

export = BasicErrorViewScssModule;
