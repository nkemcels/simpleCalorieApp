declare namespace SubscriptionSettingsTabScssNamespace {
    export interface ISubscriptionSettingsTabScss {
        ActionsWrapper: string;
        AddressInfo: string;
        Amount: string;
        Available: string;
        BillingAddressContainer: string;
        BillingHistoryTable: string;
        BillingHistoryTabs: string;
        Bold: string;
        BottomActions: string;
        BottomView: string;
        CenterPanel: string;
        ChartContainer: string;
        CloseBtn: string;
        Container: string;
        Count: string;
        CurrentPlanBox: string;
        Description: string;
        GeneralInfo: string;
        Header: string;
        Heading: string;
        Icon: string;
        Image: string;
        Input: string;
        Item: string;
        Name: string;
        NextBillingBox: string;
        PaymentMethod: string;
        PaymentMethodsContainer: string;
        PerUser: string;
        PlanName: string;
        Price: string;
        RightPanel: string;
        SeatsContainer: string;
        SeatsCount: string;
        SeatsInfo: string;
        SeatsInput: string;
        SeatsInputWrapper: string;
        StorageContainer: string;
        SubscriptionInfo: string;
        SubscriptionInfoBox: string;
        SubscriptionManagementViewContainer: string;
        Text: string;
        Title: string;
        Total: string;
        Used: string;
    }
}

declare const SubscriptionSettingsTabScssModule: SubscriptionSettingsTabScssNamespace.ISubscriptionSettingsTabScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: SubscriptionSettingsTabScssNamespace.ISubscriptionSettingsTabScss;
};

export = SubscriptionSettingsTabScssModule;
