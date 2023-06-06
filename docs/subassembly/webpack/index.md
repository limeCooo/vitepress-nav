# webpack 插件

> 常用插件，

## 提高代码编译速度实现
> 注: 下边两种方式均可以 提升编译速度 启动本地项目 第一遍速度普遍都慢， 第二遍后速度提升很多


-  安装插件在开发环境，仅优化开发环境的编译速度

```js
  npm i hard-source-webpack-plugin -D // 提编译速度
  npm i speed-measure-webpack-plugin -D // 显示编译时长
```
-   在vue.config.js中引入
```js
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

```


-   链式写法

```js
  chainWebpack: (config) => {
    config.plugin('xcCache').use(HardSourceWebpackPlugin); // 自定义插件名称
    config.plugin('xcTime').use(SpeedMeasurePlugin);
  }
```
-  普通写法

```js

  configureWebpack: {
    plugins: [
      new HardSourceWebpackPlugin(),
      new SpeedMeasurePlugin()
    ]
  }

```
