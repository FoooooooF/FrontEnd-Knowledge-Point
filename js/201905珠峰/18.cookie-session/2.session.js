const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path  =require('path');
const bodyParser =require('koa-bodyparser');
const session = require('koa-session');
const app = new Koa();
const router = new Router();
app.keys = ['zf'];
router.get('/',async ctx=>{
   await ctx.render('home');
})
// 靠cookie来实现权限
// 多端
// 为了项目的健壮 一般都是 多台服务器 -> redis mongo 共享起来复杂
// jwt json web token
// 每次客户需要带着token 我就知道这个人有权限
router.post('/login',async ctx=>{
    // 内部会自动设置cookie
    let {username,password } =  ctx.request.body;
    if(username == password){
        ctx.session.username =username;
        ctx.redirect('/profile')
    }else{
        ctx.redirect('/');
    }
})
router.get('/profile',async ctx=>{
    // 内部会自动设置cookie
    if(ctx.session.username){
        await ctx.render('profile',{username:ctx.session.username})
    }else{
        ctx.redirect('/')
    }
})
app.keys = ['zf'];
app.use(session({ // session是需要这个app属性
    httpOnly:true,
    maxAge:30000
},app));
app.use(views(path.resolve(__dirname,'views'),{
    map:{
        html:'ejs'
    }
}))
app.use(bodyParser());
app.use(router.routes())
    .use(router.allowedMethods())
    
app.listen(3000);


// 1 2 3 4
// vue核心应用 组件交互 8种
// jsx用法
// vuex + vue-router + axios jwt

// 组件封装 省市级联插件 casader 异步获取 递归组件的用法
// 单元测试 -> npm npm上

// 权限 动态路由 按钮权限 指令
// vue源码怎么剖析 MVVM原理 生命周期 MVVM  vuex vue-router

// nuxt prerender app-skeleton
// 项目部署


// jwt-simple jsonwebtoken