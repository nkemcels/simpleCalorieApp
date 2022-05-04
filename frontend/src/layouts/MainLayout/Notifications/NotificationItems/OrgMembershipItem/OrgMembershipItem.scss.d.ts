declare namespace OrgMembershipItemScssNamespace {
    export interface IOrgMembershipItemScss {
        Assigned: string;
        ContentContainer: string;
        DataContainer: string;
        DateContainer: string;
        ItemIconContainer: string;
        OrgName: string;
        OwnerName: string;
        Unassigned: string;
    }
}

declare const OrgMembershipItemScssModule: OrgMembershipItemScssNamespace.IOrgMembershipItemScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: OrgMembershipItemScssNamespace.IOrgMembershipItemScss;
};

export = OrgMembershipItemScssModule;
