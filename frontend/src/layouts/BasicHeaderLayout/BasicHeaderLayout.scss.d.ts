declare namespace BasicHeaderLayoutScssNamespace {
    export interface IBasicHeaderLayoutScss {
        Container: string;
        Content: string;
        FancyBg: string;
        HeaderContainer: string;
        InnerContent: string;
        LogoWrapper: string;
        Title: string;
    }
}

declare const BasicHeaderLayoutScssModule: BasicHeaderLayoutScssNamespace.IBasicHeaderLayoutScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: BasicHeaderLayoutScssNamespace.IBasicHeaderLayoutScss;
};

export = BasicHeaderLayoutScssModule;
