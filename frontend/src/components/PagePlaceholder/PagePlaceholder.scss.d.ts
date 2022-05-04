declare namespace PagePlaceholderScssNamespace {
    export interface IPagePlaceholderScss {
        Container: string;
        Text: string;
        Title: string;
    }
}

declare const PagePlaceholderScssModule: PagePlaceholderScssNamespace.IPagePlaceholderScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: PagePlaceholderScssNamespace.IPagePlaceholderScss;
};

export = PagePlaceholderScssModule;
