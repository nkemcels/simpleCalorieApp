declare namespace HighlightTextScssNamespace {
    export interface IHighlightTextScss {
        Highlight: string;
    }
}

declare const HighlightTextScssModule: HighlightTextScssNamespace.IHighlightTextScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: HighlightTextScssNamespace.IHighlightTextScss;
};

export = HighlightTextScssModule;
