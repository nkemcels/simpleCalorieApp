declare namespace IndexScssNamespace {
    export interface IIndexScss {
        Description: string;
        ErrorContainer: string;
        ErrorText: string;
        ErrorTitle: string;
        Header: string;
        Image: string;
        Name: string;
        OrgItemContainer: string;
        OrgListContainer: string;
        OrgsViewContainer: string;
        SelectOrgDesc: string;
        SelectOrgTitle: string;
        SubStatusContainer: string;
        SubscriptionIssuePage: string;
        Text: string;
    }
}

declare const IndexScssModule: IndexScssNamespace.IIndexScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IndexScssNamespace.IIndexScss;
};

export = IndexScssModule;
