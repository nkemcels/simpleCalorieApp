declare namespace OrgRoleModalScssNamespace {
    export interface IOrgRoleModalScss {
        Container: string;
        Content: string;
        ContentContainer: string;
        DefaultRoleCheck: string;
        DefaultRoleInfo: string;
        DisplayName: string;
        HeaderContainer: string;
        InputGroup: string;
        Label: string;
        ModalContainer: string;
        RoleItem: string;
        RoleModalContainer: string;
        RoleModalContent: string;
        RoleModalFooter: string;
        RoleModalHeader: string;
    }
}

declare const OrgRoleModalScssModule: OrgRoleModalScssNamespace.IOrgRoleModalScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: OrgRoleModalScssNamespace.IOrgRoleModalScss;
};

export = OrgRoleModalScssModule;
