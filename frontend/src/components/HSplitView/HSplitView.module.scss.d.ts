declare namespace HSplitViewModuleScssNamespace {
    export interface IHSplitViewModuleScss {
        Container: string;
        ContentView: string;
        InnerWrapper: string;
        ResizeHandleWrapper: string;
        ResizeView: string;
    }
}

declare const HSplitViewModuleScssModule: HSplitViewModuleScssNamespace.IHSplitViewModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: HSplitViewModuleScssNamespace.IHSplitViewModuleScss;
};

export = HSplitViewModuleScssModule;
