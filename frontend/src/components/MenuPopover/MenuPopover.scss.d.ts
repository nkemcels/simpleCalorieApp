declare namespace MenuPopoverScssNamespace {
    export interface IMenuPopoverScss {
        Active: string;
        ActiveIndicator: string;
        BackBtn: string;
        Basic: string;
        Content: string;
        ContentWrapper: string;
        Disabled: string;
        Header: string;
        HorzFormItem: string;
        InputForm: string;
        Item: string;
        ItemDesc: string;
        ItemGroup: string;
        ItemGroupHeader: string;
        ItemHeader: string;
        MenuOptionsContainer: string;
        Overlay: string;
        PopoverContainer: string;
        SetupIcon: string;
        SetupIconsSelectContainer: string;
        Small: string;
        Title: string;
    }
}

declare const MenuPopoverScssModule: MenuPopoverScssNamespace.IMenuPopoverScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MenuPopoverScssNamespace.IMenuPopoverScss;
};

export = MenuPopoverScssModule;
