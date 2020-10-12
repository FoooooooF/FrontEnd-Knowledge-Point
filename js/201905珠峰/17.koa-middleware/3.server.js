const Koa = require('koa');
const Router = require('koa-router');
// const views = require('koa-views');
const app = new Koa();
const path = require('path');
const router = new Router();
const util = require('util');
// vue + koa (cookie session)

const views = (dirname,{map})=>{
    return async (ctx,next)=>{
        ctx.render = async (filename,data)=>{
            let ejs = require(map.html);// 引用ejs魔板
            const renderFile = util.promisify(ejs.renderFile);
            // 渲染文件，成功后将结果返回去
            ctx.body = await renderFile(path.join(dirname,filename+'.html'),data);
        }
        await next(); // 增加逻辑后 继续向下执行 koa-static
    }
}
app.use(views(path.resolve(__dirname,'views'),{
    map: {
        html: 'ejs'
    }
})); // ctx.render 
router.get('/',async ctx=>{
    await ctx.render('hello',{name:'zf'});
})

// 允许的方法 405 如果方法不匹配就报405
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
