declare namespace SignupScssNamespace {
    export interface ISignupScss {
        ActionWrapper: string;
        BottomView: string;
        Container: string;
        ErrorAlert: string;
        FormContent: string;
        FormContentContainer: string;
        FormContentHeader: string;
        IllustrationContainer: string;
        LoginBoxContainer: string;
        LoginBoxHeader: string;
        LogoWrapper: string;
        MainContent: string;
        OrLine: string;
        OrText: string;
        SignInTip: string;
        SigninText: string;
        SignupPrompt: string;
        StepsContainer: string;
        SubText: string;
        Text: string;
        WelcomeText: string;
    }
}

declare const SignupScssModule: SignupScssNamespace.ISignupScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: SignupScssNamespace.ISignupScss;
};

export = SignupScssModule;
