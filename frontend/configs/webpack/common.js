// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    context: resolve(__dirname, "../../src"),
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/,
                use: "url-loader",
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "index.html.ejs" }), new NodePolyfillPlugin()],
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
    performance: {
        hints: false,
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
};
