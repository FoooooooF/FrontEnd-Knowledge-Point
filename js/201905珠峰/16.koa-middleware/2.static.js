const Koa = require("koa");
const app = new Koa();
const fs = require('fs').promises;
// const static = require('koa-static');
const path = require('path');
const static = (dirname)=>{
  // 中间件 必须返还一个async 函数
    return async (ctx,next)=>{
      try{
        let filePath = ctx.path;
        filePath = path.join(dirname,filePath);
        let statObj = await fs.stat(filePath);
        if(statObj.isDirectory()){
         filePath = path.join(filePath,'index.html');
        }
        ctx.body = await fs.readFile(filePath,'utf8');
        // 这里不需要在调用next方法
      }catch(e){
         return next(); // 自己无法处理 继续交给下一个人处理
      }
    }
}
app.use(static(__dirname))
app.use(static(path.resolve(__dirname,'../11.stream')));

// 中间件 ： reduce + promise / async+await  compose函数
// 自己写一篇文章



app.listen(3000);


