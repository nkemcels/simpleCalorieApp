type TGlobalSetting = {
    app: {
        port: string;
        jwtSecret: string;
        adminRegisterPassToken: string;
        frontendOrigin: string;
        email: string;
        vmAuthSecret: string;
        vmConnectionUrl: string;
        logo: {
            withText: string;
            simple: string;
        };
        routes: {
            homePage: string;
            contactUsPage: string;
        };
    };
    azure: {
        accountKey: string;
        accountId: string;
        blobStorageContainer: string;
        blobStorageUrl: string;
    };
    database: {
        dbName: string;
        connectionString: string;
    };
    sendGrid: {
        key: string;
    };
};

export const GlobalSettings: TGlobalSetting = {
    app: {
        port: process.env.PORT!,
        jwtSecret: process.env.APP_JWT_SECRET!,
        adminRegisterPassToken: process.env.ADMIN_REGISTER_PASS_TOKEN!,
        frontendOrigin: process.env.FRONTEND_ORIGIN!,
        email: process.env.MYGYM_EMAIL!,
        vmAuthSecret: process.env.VM_AUTH_SECRET!,
        vmConnectionUrl: process.env.VM_CONNECTION_URL!,
        logo: {
            withText: `${process.env.FRONTEND_ORIGIN!}/logo-text.png`,
            simple: `${process.env.FRONTEND_ORIGIN!}/logo.png`,
        },
        routes: {
            homePage: process.env.HOME_PAGE_URL!,
            contactUsPage: process.env.CONTACT_US_URL!,
        },
    },
    azure: {
        accountKey: process.env.AZURE_ACCOUNT_KEY!,
        accountId: process.env.AZURE_ACCOUNT_ID!,
        blobStorageContainer: process.env.AZURE_BLOB_STORAGE_CONTAINER!,
        blobStorageUrl: `https://${process.env.AZURE_ACCOUNT_ID}.blob.core.windows.net`,
    },
    database: {
        dbName: "mygym",
        connectionString: process.env.DATABASE_URL!,
    },
    sendGrid: {
        key: process.env.SENDGRID_KEY!,
    },
};

console.log("NODE ENV ", process.env.NODE_ENV);
