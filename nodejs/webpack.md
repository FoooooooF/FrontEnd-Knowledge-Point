# webpack
## 基本概念
- entry
- output
- loader
- plugins
- mode
## 基本原理
```js
(function(modules){
    let keys=Object.keys(modules);
    keys.forEach(key=>{
        eval(modules[key]);
    })
})({
    "module1.js":"fuction aa(){console.log('aa')}"
    "module1.js":"fuction bb(){console.log('bb')}"
})
```
## 参考
1. [webpack 官网](https://www.webpackjs.com/concepts/)
2. [webpack——devtool配置及sourceMap的选择](https://blog.csdn.net/zwkkkk1/article/details/88758726)
