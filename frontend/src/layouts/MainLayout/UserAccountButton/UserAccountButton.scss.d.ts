declare namespace UserAccountButtonScssNamespace {
    export interface IUserAccountButtonScss {
        Avatar: string;
        AvatarContainer: string;
        Badge: string;
        ChevronIcon: string;
        Disable: string;
        Email: string;
        ExtraActionsItemContainer: string;
        ExtraActionsListContainer: string;
        Icon: string;
        Name: string;
        NameContainer: string;
        Offline: string;
        Online: string;
        ReconnectingIcon: string;
        SignedInActionsContainer: string;
        SignedInActionsPopContainer: string;
        SignedInButtonContainer: string;
        Text: string;
        UserDetailsContainer: string;
        UserName: string;
    }
}

declare const UserAccountButtonScssModule: UserAccountButtonScssNamespace.IUserAccountButtonScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: UserAccountButtonScssNamespace.IUserAccountButtonScss;
};

export = UserAccountButtonScssModule;
