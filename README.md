1. 安装node
  > 下载安装node8.11.3,地址:https://nodejs.org/zh-cn/
2. 配置阿里npm镜像库
  > npm config set registry https://registry.npm.taobao.org
  > npm config get registry
4. 初始化环境,只需做一次
  > npm install
3. 修改了html-webpack-plugin源码
./node_modules/html-webpack-plugin/index.js 覆盖第549-554行,然后保存即可

 // 如果 inject 传入参数为对象则区分打包. @author qust 2018/7/18 14:38 code review
 if (typeof this.options.inject === 'object') {
     this.options.inject.head.forEach(value => {
         var injectScripts = scripts.filter(script => script.attributes.src.indexOf(value) > -1)
         head = head.concat(injectScripts)
     })

     this.options.inject.body.forEach(value => {
         var injectScripts = scripts.filter(script => script.attributes.src.indexOf(value) > -1)
         body = body.concat(injectScripts)
     })
 } else {
     // 原版逻辑.
     if (this.options.inject === 'head') {
         head = head.concat(scripts);
     } else {
         body = body.concat(scripts);
     }
 }

4. 开发命令: npm run start

5. 生产打包: npm run build