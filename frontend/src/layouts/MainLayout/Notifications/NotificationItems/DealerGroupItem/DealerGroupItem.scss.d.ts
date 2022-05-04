declare namespace DealerGroupItemScssNamespace {
    export interface IDealerGroupItemScss {
        Assigned: string;
        Completed: string;
        ContactName: string;
        ContentContainer: string;
        DataContainer: string;
        DateContainer: string;
        ItemIconContainer: string;
        OwnerName: string;
        Unassigned: string;
    }
}

declare const DealerGroupItemScssModule: DealerGroupItemScssNamespace.IDealerGroupItemScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DealerGroupItemScssNamespace.IDealerGroupItemScss;
};

export = DealerGroupItemScssModule;
