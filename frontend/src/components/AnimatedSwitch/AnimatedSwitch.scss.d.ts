declare namespace AnimatedSwitchScssNamespace {
    export interface IAnimatedSwitchScss {
        Container: string;
    }
}

declare const AnimatedSwitchScssModule: AnimatedSwitchScssNamespace.IAnimatedSwitchScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AnimatedSwitchScssNamespace.IAnimatedSwitchScss;
};

export = AnimatedSwitchScssModule;
