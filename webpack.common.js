/**
 * webpack公共配置
 *
 * @author qust 2018/7/19 11:05
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');                     // html插件
const CleanWebpackPlugin = require('clean-webpack-plugin');                   // clean插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");              // 最小化css提取插件
const CopyWebpackPlugin = require('copy-webpack-plugin');                     // 拷贝插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');                    // 丑化js插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');// 优化css资源插件

const config = require('./config.js');                                        // 功能函数配置

let rootPath = './src';                                                       // 设置构建的源文件根路径

// 设置插件
let plugins = [
    // 每次构建清除dist目录
    new CleanWebpackPlugin(['dist']),
    // 压缩css抽取:结合OptimizeCssAssetsPlugin把css打包成一行
    new MiniCssExtractPlugin({
        filename: "[name].[hash:7].css",
        // chunkFilename: "[id].[hash:7].css"
    }),
    // 入口页面
    new HtmlWebpackPlugin({
        chunks: [],
        filename: 'index.html',
        template: 'src/index.html'
    }),
    // 基础组件拷贝
    new CopyWebpackPlugin([
        {from: 'src/components/easyui/jquery.min.js', to: 'components/easyui/jquery.min.js'},
        {from: 'src/components/easyui/jquery.easyui.min.js', to: 'components/easyui/jquery.easyui.min.js'}
        // {from: 'src/components/easyui/exp', to: 'components/easyui/exp', toType: 'dir'},
        // {from: 'src/components/private/js/configApp.js', to: 'components/private/js/configApp.js'}
    ], {})
];

// 获取src下所有js文件,不包括components目录
let entries = config.entry(rootPath);

// 对每个js,构造html插件
for (let key in entries) {
    let fileName = key.replace("/js/", "/") + ".html";
    plugins.push(
        new HtmlWebpackPlugin({
            filename: fileName, // 输出的文件名称
            template: rootPath + '/' + fileName, // html模板名称
            chunks: [key,'components/private/js/header'], // js关联
            //hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false
            showErrors: true, // showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true
            //inject: true,  // 注入选项 有四个值 ture: 默认值，script标签位于html文件的 body 底部, body: 同 true, head: script标签位于html文件的 head 底部,false:不注入script标签
            inject:{
                head: ['components/private/js/header'], // <head>标签关联js设置
                body: [key] // <body>标签末尾关联js设置
            },
            minify: {
                removeComments: true //是否压缩时 去除注释
            },
            cache: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
        })
    );
}

// 添加header入口
entries['components/private/js/header'] = './src/components/private/js/header.js';

// 主体配置
module.exports = {
    entry: entries, // 入口配置
    output: {       // 出口配置
        filename: '[name].[hash:5].js',        // 输出文件名称配置
        path: path.resolve(__dirname, 'dist'), // 输出根目录配置
        publicPath: "/"                        // 发布根路径配置
    },
    // 最小化压缩配置
    optimization: {
        minimizer: [
            // js丑化压缩
            new UglifyJsPlugin({
                test: /\.js($|\?)/i
            }),
            // css最小压缩
            new OptimizeCssAssetsPlugin({})
        ]
    },
    // 加载器规则
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [{loader: 'html-loader'}]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024, // 小于1K的文件直接转成编码字符串
                        outputPath: 'img/',
                        name: '[path][name].[hash:5].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    // 插件配置
    plugins: plugins,

    // 文件解析器: resolver
    resolve: {
        /**
         * 扩展名默认为以下扩展名,可以手动配置添加
         * extensions: ['.wasm', '.mjs', '.js', '.json']
         */
        //extensions: ['', '.js', '.es6', '.vue'],
        /**
         * 别名设置
         */
        alias: {
            // 业务页面样式
            easyuiBase: path.resolve(__dirname, './src/components/easyui/themes/material/easyui.css'),   // easyUI主样式
            easyuiIcon: path.resolve(__dirname, './src/components/easyui/themes/icon.css'),              // easyUI图标样式
            easyuiColor: path.resolve(__dirname, './src/components/easyui/themes/color.css'),            // easyUI颜色样式
        }
    }
};