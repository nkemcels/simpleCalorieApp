declare namespace DevicesScssNamespace {
    export interface IDevicesScss {
        CardContent: string;
    }
}

declare const DevicesScssModule: DevicesScssNamespace.IDevicesScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DevicesScssNamespace.IDevicesScss;
};

export = DevicesScssModule;
