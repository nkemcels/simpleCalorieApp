declare namespace EmailConnectorScssNamespace {
    export interface IEmailConnectorScss {
        ConnectedEmails: string;
        EmailItem: string;
        Header: string;
        InnerWrapper: string;
        Name: string;
        ViewContainer: string;
    }
}

declare const EmailConnectorScssModule: EmailConnectorScssNamespace.IEmailConnectorScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: EmailConnectorScssNamespace.IEmailConnectorScss;
};

export = EmailConnectorScssModule;
