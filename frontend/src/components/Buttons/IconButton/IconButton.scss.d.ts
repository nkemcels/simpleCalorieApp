declare namespace IconButtonScssNamespace {
    export interface IIconButtonScss {
        Active: string;
        Container: string;
        Default: string;
        Disabled: string;
        Large: string;
        Primary: string;
        Small: string;
    }
}

declare const IconButtonScssModule: IconButtonScssNamespace.IIconButtonScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IconButtonScssNamespace.IIconButtonScss;
};

export = IconButtonScssModule;
