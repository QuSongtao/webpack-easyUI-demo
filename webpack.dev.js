/**
 * webpack开发环境配置
 * @author qust 2018/7/19 11:21
 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

function filter(req, res, proxyOptions) {// 请求过滤,如果以.html结尾的,则忽略
    if (req.headers.accept.indexOf('html') !== -1) {
        return '/XXXXX.html';
    }
}

module.exports = merge(common, {
    // 开启源代码行匹配
    devtool: 'inline-source-map',
    // 设置运行方式,支持3种方式:development|production|none
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 模块热替换,无需清除浏览器缓存
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // 设置环境变量,在js中可以直接使用如: if(process.env.NODE_ENV==='development')...
        })
    ],
    // 开发Server配置
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 根目录
        port: 9000,                                   // 端口
        hot: true,                                    // 热部署
        overlay: true,                                // 设置浏览器输出异常
        // 跨域代理
        proxy: [
            {
                context: ['/framework/**', '/busi/**'],    // 请求url通配
                target: 'http://192.168.2.135:10900',      // 转发地址
                secure: false,                             // 对https请求禁用安全
                bypass: filter                             // 请求过滤
            },
            {
                context: ['/taskmgr/**'],                  // 请求url通配
                target: 'http://127.0.0.1:20902',          // 转发地址
                secure: false,                             // 对https请求禁用安全
                bypass: filter                             // 请求过滤
            },
            {
                context: ['/api/**'],                      // 请求url通配
                target: 'http://127.0.0.1:20909',          // 转发地址
                secure: false,                             // 对https请求禁用安全
                bypass: filter                             // 请求过滤
            }
        ],
        // 配置服务启动时输出选项
        stats: {
            assets: true,     // 增加资源信息
            children: false,  // 增加子级的信息
            modules: false,   // 增加内置的模块信息
            chunks: false,    // 增加包信息（设置为 `false` 能允许较少的冗长输出）
            publicPath: false,// 增加 publicPath 的信息
            timings: true,    // 增加时间信息
            warnings: true,   // 增加提示
            colors: {green: '\u001b[32m',}// `webpack --colors` 等同于
        }
    }
});