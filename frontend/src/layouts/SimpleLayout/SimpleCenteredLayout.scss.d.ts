declare namespace SimpleCenteredLayoutScssNamespace {
    export interface ISimpleCenteredLayoutScss {
        Container: string;
        ContentWrapper: string;
    }
}

declare const SimpleCenteredLayoutScssModule: SimpleCenteredLayoutScssNamespace.ISimpleCenteredLayoutScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: SimpleCenteredLayoutScssNamespace.ISimpleCenteredLayoutScss;
};

export = SimpleCenteredLayoutScssModule;
