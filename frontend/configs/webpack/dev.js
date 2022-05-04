// development config
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "development",
    entry: [
        "react-hot-loader/patch", // activate HMR for React
        "webpack-dev-server/client?http://localhost:3000", // bundle the client for webpack-dev-server and connect to the provided endpoint
        "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
        "./index.tsx", // the entry point of our app
    ],
    devServer: {
        hot: true, // enable HMR on the server
        port: 3000,
        host: "0.0.0.0",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            // SASS support - compile all .global.scss files and pipe it to style.css
            {
                test: /\.global\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            // SASS support - compile all other .scss files and pipe it to style.css
            {
                test: /^((?!\.global).)*\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "@teamsupercell/typings-for-css-modules-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            },
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            // LESS support - compile all .global.scss files and pipe it to style.css
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                    },
                },
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                    },
                },
            },
            // OTF Font
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "font/otf",
                    },
                },
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream",
                    },
                },
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader",
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml",
                    },
                },
            },
        ],
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    ],
});
