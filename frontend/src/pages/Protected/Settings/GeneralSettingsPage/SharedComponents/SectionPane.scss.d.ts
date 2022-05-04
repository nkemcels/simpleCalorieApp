declare namespace SectionPaneScssNamespace {
    export interface ISectionPaneScss {
        DetailsWrapper: string;
        Header: string;
        Icon: string;
        NameWrapper: string;
        Section: string;
    }
}

declare const SectionPaneScssModule: SectionPaneScssNamespace.ISectionPaneScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: SectionPaneScssNamespace.ISectionPaneScss;
};

export = SectionPaneScssModule;
