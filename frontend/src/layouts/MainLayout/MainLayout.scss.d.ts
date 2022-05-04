declare namespace MainLayoutScssNamespace {
    export interface IMainLayoutScss {
        Container: string;
        ContentContainer: string;
        ContentWrapper: string;
        DarkTheme: string;
        DummyMenuItem: string;
        GlobalSearch: string;
        Header: string;
        HeaderActions: string;
        HeaderContainer: string;
        Inner: string;
        ItemIcon: string;
        LogoWrapper: string;
        MenuContainer: string;
        MenuItemBadge: string;
        Name: string;
        Notifications: string;
        Sidebar: string;
        SidebarContainer: string;
        SidebarHeader: string;
        UserAccountBtn: string;
    }
}

declare const MainLayoutScssModule: MainLayoutScssNamespace.IMainLayoutScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MainLayoutScssNamespace.IMainLayoutScss;
};

export = MainLayoutScssModule;
