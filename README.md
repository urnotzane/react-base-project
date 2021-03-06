# react-base-project
react脚手架

## 新建项目
首先在github新建项目顺带添加一个`README.md`文件并克隆到本地，切换到本地项目根目录。OK,PERFECT:sparkles:

## 开始搭建项目
### 安装最新webpack
`当前最新为webpack4。`
```bash
# 添加package.json
npm init
# 安装webpack4
npm install --save-dev webpack
```
如果你使用 webpack v4+ 版本，你还需要安装 CLI（此工具用于在命令行中运行 webpack）。
```bash
npm install --save-dev webpack-cli
```

创建以下目录结构、文件和内容：
```diff
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

### 安装loader
```bash
# less
npm install --save-dev style-loader css-loader less-loader less

# 图片，字体
npm install --save-dev file-loader

# 为html文件引入外部资源的插件
npm install --save-dev html-webpack-plugin

# 每次构建项目前清理dist文件夹
npm install clean-webpack-plugin --save-dev

# 本地web服务器
npm install --save-dev webpack-dev-server

# 合并webpack配置文件
npm install --save-dev webpack-merge

# js编译
npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-syntax-dynamic-import @babel/runtime

# css分离和压缩
npm install --save-dev mini-css-extract-plugin optimize-css-assets-webpack-plugin

# 路由按需加载 按照文档进行配置，但看不出是否生效
# npm i --save react-loadable @types/react-loadable
```

### Service Worker离线服务
[渐进式网络应用程序](https://webpack.docschina.org/guides/progressive-web-application/)

### 使用postcss
[postcss](https://github.com/postcss/postcss/blob/master/README-cn.md)
- 解决全局 CSS 的问题
  postcss-modules 和 react-css-modules 可以自动以组件为单位隔绝 CSS 选择器。
- 添加浏览器前缀
  autoprefixer 添加了 vendor 浏览器前缀，它使用 Can I Use 上面的数据。

## 问题
- `Failed to register a ServiceWorker: A bad HTTP response code (404) was gwreceived when fetching the script.`
  
  service-worker.js必须和index.html在同一个文件夹

- `SW registration failed:  TypeError: Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.`

  Service Worker必须在https和localhost下运行。

- `Type error: Cannot find global value 'Promise'. TS2468`

  [找不到promise](https://github.com/facebook/create-react-app/issues/5683)

  tsconfig.json添加以下配置（编译过程中需要引入的库文件的列表）：
  ```json
  "compilerOptions": {
    "lib": [
      "es5",
      "dom",
      "es2015.promise"
    ]
  }
  ```

- `TS2580: Cannot find name 'require'.`

  首先安装`npm install @types/node --save-dev`，然后tsconfig.json添加配置：
  ```json
  "types": [
    "node"
  ]
  ```

- `Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history stack`

  这个问题只会在开发环境出现，不会在开发环境出现。

- webpack配置使用`import{}`会报错

## 配置react
### 安装
```bash
# 安装babel编译插件
npm install --save-dev @babel/preset-react

# 安装react
npm i --save react react-dom @types/react @types/react-dom

# 安装router 怎么按需加载
npm i -D react-router-dom history @types/react-router-dom
```