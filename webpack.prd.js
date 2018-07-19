const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    // 开启源代码行匹配
    devtool: 'source-map',
    // 设置运行方式,支持3种方式:development|production|none
    mode: 'production'
});