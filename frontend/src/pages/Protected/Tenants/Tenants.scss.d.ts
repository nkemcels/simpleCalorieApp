declare namespace TenantsScssNamespace {
    export interface ITenantsScss {
        Actions: string;
        CardContent: string;
        FormContainer: string;
        FormContentCard: string;
        FormItem: string;
        FrontendAppContainer: string;
        GenerateKeyContainer: string;
        Label: string;
    }
}

declare const TenantsScssModule: TenantsScssNamespace.ITenantsScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: TenantsScssNamespace.ITenantsScss;
};

export = TenantsScssModule;
