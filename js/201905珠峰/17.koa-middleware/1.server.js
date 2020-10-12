const Koa = require('koa');
const Router = require('./koa-router'); // 中间件
const router = new Router();
const app = new Koa();
// get post put delete
// 路径参数 * 表示所有路径
router.get('/hello',async (ctx,next)=>{
    ctx.body = 'hello';
    next();
})
router.get('/hello',async (ctx,next)=>{
    ctx.body = 'hello2';
    next();
})
router.get('/world',async (ctx,next)=>{
    ctx.body = 'world';
})
// 装载路由
app.use(router.routes());
app.use(async ctx=>{
    ctx.body = '你好'
})
app.listen(3000);


// csrf xss (获取用户的cookie)
// 钓鱼网站  referer  验证码
// wifi 
// 存到数据库 持久化