const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    target: "node",
    devtool: "inline-source-map",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.ts?$/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/utils/emailTemplates", to: "build/utils" },
                { from: "other", to: "public" },
            ],
        }),
    ],
};
