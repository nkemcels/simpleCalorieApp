declare namespace ContactItemScssNamespace {
    export interface IContactItemScss {
        Assigned: string;
        Completed: string;
        ContactName: string;
        ContentContainer: string;
        DataContainer: string;
        DateContainer: string;
        ItemIconContainer: string;
        OwnerName: string;
        Unassigned: string;
    }
}

declare const ContactItemScssModule: ContactItemScssNamespace.IContactItemScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: ContactItemScssNamespace.IContactItemScss;
};

export = ContactItemScssModule;
