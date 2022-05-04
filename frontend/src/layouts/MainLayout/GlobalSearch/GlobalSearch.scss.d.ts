declare namespace GlobalSearchScssNamespace {
    export interface IGlobalSearchScss {
        Active: string;
        Container: string;
        Icon: string;
        Input: string;
        ItemHeader: string;
        ItemList: string;
        ItemListValueContainer: string;
        MatchEntityContainer: string;
        MatchField: string;
        MatchValue: string;
        MatchValueContainer: string;
        Name: string;
        NoResultContainer: string;
        ResultsGroup: string;
        ResultsOverlay: string;
        ResultsView: string;
        ResultsViewPopover: string;
        SearchContainer: string;
    }
}

declare const GlobalSearchScssModule: GlobalSearchScssNamespace.IGlobalSearchScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: GlobalSearchScssNamespace.IGlobalSearchScss;
};

export = GlobalSearchScssModule;
