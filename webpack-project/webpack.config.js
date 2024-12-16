// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...glob.sync('./src/pages/*.html').map((file) => {
            return new HtmlWebpackPlugin({
                title: path.basename(file, '.html'),
                template: file,
                filename: path.basename(file),
                chunks: ['main'],
            });
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    mode: 'development',
};
