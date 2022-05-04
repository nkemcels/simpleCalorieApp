declare namespace MemberInviteModalScssNamespace {
    export interface IMemberInviteModalScss {
        Avatar: string;
        Close: string;
        Container: string;
        Content: string;
        ContentContainer: string;
        Description: string;
        HeaderContainer: string;
        InviteInputGroup: string;
        InviteModalContainer: string;
        InviteModalContent: string;
        InviteModalFooter: string;
        InviteModalHeader: string;
        InviteeTag: string;
        KeyboardKey: string;
        ModalContainer: string;
        Text: string;
    }
}

declare const MemberInviteModalScssModule: MemberInviteModalScssNamespace.IMemberInviteModalScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MemberInviteModalScssNamespace.IMemberInviteModalScss;
};

export = MemberInviteModalScssModule;
