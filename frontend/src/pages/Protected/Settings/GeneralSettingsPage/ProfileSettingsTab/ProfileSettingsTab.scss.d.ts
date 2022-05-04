declare namespace ProfileSettingsTabScssNamespace {
    export interface IProfileSettingsTabScss {
        Action: string;
        ActionView: string;
        Actions: string;
        AvatarWrapper: string;
        BasicInfoView: string;
        Container: string;
        DangerActionWrapper: string;
        Description: string;
        FormContent: string;
        LoginCredentialsView: string;
        ProfileImgContainer: string;
        Title: string;
        UpdatePasswordView: string;
    }
}

declare const ProfileSettingsTabScssModule: ProfileSettingsTabScssNamespace.IProfileSettingsTabScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: ProfileSettingsTabScssNamespace.IProfileSettingsTabScss;
};

export = ProfileSettingsTabScssModule;
