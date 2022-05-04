declare namespace CustomerApplicationsScssNamespace {
    export interface ICustomerApplicationsScss {
        ApplicationStatus: string;
        Approved: string;
        CardContent: string;
        Photo: string;
        PhotoCard: string;
        PhotoViewContainer: string;
        Rejected: string;
        Title: string;
    }
}

declare const CustomerApplicationsScssModule: CustomerApplicationsScssNamespace.ICustomerApplicationsScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: CustomerApplicationsScssNamespace.ICustomerApplicationsScss;
};

export = CustomerApplicationsScssModule;
