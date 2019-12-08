// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/ts/bootstrap.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/dist',
    },
    resolve: {
        extensions: ['.js', '.ts', '.wasm'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     loader: 'source-map-loader',
            // },
        ],
    },
    // devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        // new CopyWebpackPlugin(['src/js/p5.min.js']),
    ],
    // devServer: {
    //     host: '0.0.0.0',
    //     disableHostCheck: true,
    // },
};
