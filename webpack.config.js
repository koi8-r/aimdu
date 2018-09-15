'use strict' ;


const webpack = require('webpack') ;
const path = require('path') ;
const CopyWebpackPlugin = require('copy-webpack-plugin') ;


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        'main': './src/app/lib/main',
        // 'test': './src/app/test'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9090
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib/[name].js',
        // publicPath: '/'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '.', '.')
        }
    },
    plugins: [
        // new DefinePlugin()
        new CopyWebpackPlugin([
            { from: './src/*.html', to: './[name].[ext]' },
        ]),
        new webpack.ProvidePlugin({
            _: 'lodash',
            _map: ['lodash', 'map']
        })
    ],
    module: {
        rules: [
            {
                test: /\.(txt|vue.html)$/,
                use: [{
                    loader: 'raw-loader'
                }]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-syntax-dynamic-import']
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash:8].[ext]',
                        outputPath: 'assets/',
                        publicPath: '/img'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'font/[name].[hash:8].[ext]'
                    }
                }]
            },
        ]
    }
}

