declare namespace CustomersScssNamespace {
    export interface ICustomersScss {
        CardContent: string;
    }
}

declare const CustomersScssModule: CustomersScssNamespace.ICustomersScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: CustomersScssNamespace.ICustomersScss;
};

export = CustomersScssModule;
