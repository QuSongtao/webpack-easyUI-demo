/**
 * @author qust 2018/7/19 10:49
 * 入口文件，通过遍历获取所有入口js,入后输出到相应的目录
 */
const fs = require('fs');  // node的fs模块,对文件进行操作

//遍历获取所有js节点
var getEntries = function (url, map, rootPath) {
    var files = [];
    //判断给定的路径是否存在
    if (fs.existsSync(url)) {
        //返回文件和子目录的数组
        files = fs.readdirSync(url);
        //console.log(files);
        files.forEach(function (file, index) {
            var curPath = url + "/" + file;
            if (file !== 'components') {
                //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    getEntries(curPath, map, rootPath);
                } else {
                    // 是js文件
                    if (curPath.match(".*\.js$") !== null) {
                        let key = curPath.replace("\.js", "").replace(rootPath + "/", '');
                        map[key] = curPath;
                    }
                }
            }
        });
    } else {
        console.log("给定的路径不存在，请给出正确的路径");
    }
};

function entries(path) {
    var map = {};
    getEntries(path, map, path);
    return map;
}

var getHtml = function (url, plugins) {
    var files = [];
    //判断给定的路径是否存在
    if (fs.existsSync(url)) {
        //返回文件和子目录的数组
        files = fs.readdirSync(url);
        files.forEach(function (file, index) {
            var curPath = url + "/" + file;
            // var curPath = path.join(url,file);
            //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
            if (fs.statSync(curPath).isDirectory()) { // recurse
                getHtml(curPath, plugins);
                // 是文件delete file
            } else {
                if (curPath.match(".*\.html$") !== null) {
                    plugins.push(curPath);
                }
            }
        });
    } else {
        console.log("给定的路径不存在，请给出正确的路径");
    }
};

function htmlPlugins(path) {
    var plugins = [];
    getHtml(path, plugins);
    return plugins;
}

module.exports = {
    entry: entries,
    htmlPlugin: htmlPlugins
};
