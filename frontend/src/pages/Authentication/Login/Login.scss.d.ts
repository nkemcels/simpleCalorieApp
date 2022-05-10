declare namespace LoginScssNamespace {
    export interface ILoginScss {
        ActionWrapper: string;
        BottomView: string;
        Container: string;
        ErrorAlert: string;
        FormContent: string;
        LoginBoxContainer: string;
        LoginBoxHeader: string;
        LogoWrapper: string;
        OrLine: string;
        OrText: string;
        SigninText: string;
        SignupPrompt: string;
        Text: string;
        WelcomeText: string;
    }
}

declare const LoginScssModule: LoginScssNamespace.ILoginScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: LoginScssNamespace.ILoginScss;
};

export = LoginScssModule;
