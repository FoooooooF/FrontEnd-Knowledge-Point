# Webpack
## 核心原理
```js
//webpack 模块化原理 
(function (modules) {
    //加载过的模组     
    let installedModules = {};
    //模组加载_require方法
    function _require(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId];
        }
        let module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            laoded: false
        }
        //模组调用,并递归的require         
        modules[moduleId].call(module.exports, module, module.exports, _require);
        module.loaded = true;
        return module.exports;
    }
    return _require(0);
})([function (module, exports, require) {//模块0 入口模块
    let obj = require(1);
    console.log(obj)
}, function (module, exports, require) {//模块1
    let name = "fooooooof";
    exports.name = name;
}])
```

## px转vw单位 postcss-px-to-viewport插件
```css
padding-top: 10px; /* px-to-viewport-ignore */
/* px-to-viewport-ignore-next */
padding-bottom: 10px;
/* Any other comment */
```

## webpack 文件引用名称静态化
- [manifest](https://www.webpackjs.com/concepts/manifest/)
- webpack.Optimization [英文文档 v5.0.0](https://webpack.js.org/configuration/optimization/#root) [中文文档 v5.0.0](https://webpack.docschina.org/configuration/optimization/#optimizationnamedchunks)
- [webpack4 optimization总结](https://segmentfault.com/a/1190000017066322)
- [webpack4 optimization配置splitChunks和namedChunks](https://juejin.im/post/5dcbad5df265da4cf4070741)

## 参考
[webpack 博客 :star: ](https://survivejs.com/webpack/optimizing/separating-manifest/)
[postcss-px-to-viewport px转vw](https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md)

