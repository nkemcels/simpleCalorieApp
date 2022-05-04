declare namespace GeneralItemStylesScssNamespace {
    export interface IGeneralItemStylesScss {
        Container: string;
        DeleteBtn: string;
        Deleting: string;
    }
}

declare const GeneralItemStylesScssModule: GeneralItemStylesScssNamespace.IGeneralItemStylesScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: GeneralItemStylesScssNamespace.IGeneralItemStylesScss;
};

export = GeneralItemStylesScssModule;
