# webpack 打包
    前端最流行的打包工具(本次学习基于webpack4).
## 两个核心 loader  plugin
- 基本结构
  - entry 入口
  - output 输出
  - moudle 模块loader
  - plugins 插件
  - mode 模式 development/production
  - resolve 配置解析

## 常用loader
- less-loader
- babel
- sass-loader
- postcss-loader+autoperfixer  自动加前缀

## 常用plugin
- html-webpack-plugin  html 模板
- clean-webpack-plugin 清理打包目标目录
- extract-text-webpack-plugin@next  抽离css样式文件
- purifycss-webpack  删除不需要的css样式
- copy-webpack-plugin  复制目录到输出目录

## reference
[webapck 中文文档](https://www.webpackjs.com/concepts/)