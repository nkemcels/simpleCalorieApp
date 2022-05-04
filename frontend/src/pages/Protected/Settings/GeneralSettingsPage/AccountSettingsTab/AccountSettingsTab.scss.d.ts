declare namespace AccountSettingsTabScssNamespace {
    export interface IAccountSettingsTabScss {
        Action: string;
        ActionView: string;
        Actions: string;
        AnchorWrapper: string;
        AvatarWrapper: string;
        BasicOrgInfoView: string;
        Container: string;
        ContentWrapper: string;
        DangerActionWrapper: string;
        DealerGroupItem: string;
        DealerGroupList: string;
        DealerGroupsView: string;
        Desc: string;
        Description: string;
        DgroupItemZoomIn: string;
        FormContainer: string;
        Name: string;
        Names: string;
        OwnerWrapper: string;
        Placeholder: string;
        StatusTag: string;
        Title: string;
    }
}

declare const AccountSettingsTabScssModule: AccountSettingsTabScssNamespace.IAccountSettingsTabScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AccountSettingsTabScssNamespace.IAccountSettingsTabScss;
};

export = AccountSettingsTabScssModule;
