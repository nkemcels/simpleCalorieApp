declare namespace DataTableScssNamespace {
    export interface IDataTableScss {
        ActionsWrapper: string;
        CloseBtn: string;
        Col: string;
        Container: string;
        FilterItem: string;
        FiltersContainer: string;
        SearchFieldWrapper: string;
        TableContainer: string;
        TopHeaderControls: string;
        Vals: string;
    }
}

declare const DataTableScssModule: DataTableScssNamespace.IDataTableScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DataTableScssNamespace.IDataTableScss;
};

export = DataTableScssModule;
