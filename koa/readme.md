# Koa原理
## 洋葱模型
![洋葱](./assets/koa01.png)
```js
const Koa = require('koa');

const app = new Koa();
const PORT = 3000;

// #1
app.use(async (ctx, next)=>{
    console.log(11)
    await next();
    console.log(12)
});
// #2
app.use(async (ctx, next) => {
    console.log(21)
    await next();
    console.log(22)
})

app.use(async (ctx, next) => {
    console.log(3)
})

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
```

问http://localhost:3000，控制台打印：
```
11
21
3
22
12
```

## 参考
1. [koa 中文网](https://koa.bootcss.com/#introduction)
2. [nunjucks 中文网](https://nunjucks.bootcss.com/)
2. [eggjs 中文网](https://eggjs.org/zh-cn/intro/)