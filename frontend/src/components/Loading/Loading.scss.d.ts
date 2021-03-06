declare namespace LoadingScssNamespace {
    export interface ILoadingScss {
        Container: string;
        LoadingIcon: string;
        LoadingText: string;
    }
}

declare const LoadingScssModule: LoadingScssNamespace.ILoadingScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: LoadingScssNamespace.ILoadingScss;
};

export = LoadingScssModule;
