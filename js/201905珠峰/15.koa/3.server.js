// const Koa = require('koa');
const Koa = require('./koa/application')
const app = new Koa();
const logger = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('hello')
            resolve();
        },2000)
    })
}
app.use( async (ctx,next)=>{
    console.log(1);
    ctx.a = 100;
    next();
    console.log(2);
})

app.listen(3000);