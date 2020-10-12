const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const rootRouter = new Router();
const userRouter = require('./routes/user')
// 一个大路由 控制一个小路由
// 可以将文件进行分层
// prefix 可以增加前缀 router.use() 可以注册二级路由
rootRouter.use('/user',userRouter.routes()); // 二级路由的写法
app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
app.listen(3000);
// npm install -g koa-generator
// koa2 -e project-name