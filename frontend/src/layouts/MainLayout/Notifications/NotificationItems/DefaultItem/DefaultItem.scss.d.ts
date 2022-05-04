declare namespace DefaultItemScssNamespace {
  export interface IDefaultItemScss {
    Container: string;
    ContentContainer: string;
    DataContainer: string;
    DateContainer: string;
    ItemIconContainer: string;
  }
}

declare const DefaultItemScssModule: DefaultItemScssNamespace.IDefaultItemScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DefaultItemScssNamespace.IDefaultItemScss;
};

export = DefaultItemScssModule;
