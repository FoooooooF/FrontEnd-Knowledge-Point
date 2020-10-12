const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
// 做权限校验 session
// 登录页面 =>   展示页面
console.log(require('crypto').createHmac('sha1','zf').update('name=zf').digest('base64'))
// sh1 
// cookie
app.keys = ['zf'];
router.get('/read',ctx=>{
    ctx.body = ctx.cookies.get(namec);
});
router.get('/write',ctx=>{
    ctx.cookies.set('name','zf',{signed:true});
    ctx.cookies.set('age',10);
    ctx.body = 'write ok'
})

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000);