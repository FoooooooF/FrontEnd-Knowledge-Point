const Router = require('koa-router');
const userRouter = new Router(); // 命名空间{prefix:'/user'}
userRouter.get('/add',ctx=>{
    ctx.body = 'add'
})
userRouter.get('/delete',ctx=>{
    ctx.body = 'delete'
})

module.exports = userRouter