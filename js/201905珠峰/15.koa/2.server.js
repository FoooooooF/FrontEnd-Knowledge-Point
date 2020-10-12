const Koa = require('koa');

const app = new Koa();
// next指代的是下一个use中注册的方法
// koa 中只要是异步逻辑 就把他封装成一个promise
const logger = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('hello')
            resolve();
        },2000)
    })
}
// 需要等待后面的中间件 函数执行完后在继续执行所以必须要在next前面增加await属性
// 把所有的中间件 都组合成一个大的promise
// 等待这个promise成功后在将结果返回
app.use(async (ctx,next)=>{
    console.time('start')
    return next();; // 执行异步方法，但是没有等待这个异步完成
    console.timeEnd('start')
    // await return不会再次执行下面的代码了
})
app.use(async (ctx,next)=>{
    console.log(3);
    await logger();
    await next();
    console.log(4);
    ctx.body = 'world';
})
app.use((ctx,next)=>{
    console.log(5);
    next();
    console.log(6);
});
app.listen(3000);