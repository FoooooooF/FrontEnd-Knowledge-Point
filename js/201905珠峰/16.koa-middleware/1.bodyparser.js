const Koa = require("koa");
// const bodyParser = require("koa-bodyparser"); // 它不支持文件上传
const app = new Koa();
// 中间件
// 1)中间执行的逻辑
// 2) 可以在我们的ctx上扩展一些属性或者方法
// 3) 决定是否向下执行 权限
const bodyParser = ()=>{ // 自定义中间件的写法 就是返还一个async函数 如果需要乡下执行就调用next
    return async (ctx,next)=>{
        await new Promise((resolve,reject)=>{
            let arr = [];
            ctx.req.on('data',(chunk)=>{
                arr.push(chunk);
            })
            ctx.req.on('end',function(){
                // 实现判断json 表单 上传文件
                ctx.request.body = Buffer.concat(arr).toString();
                resolve();
            })
        })
        await next();
    }
}
app.use(bodyParser()); // ctx.request.body
app.use(async (ctx, next) => {
  if (ctx.method === "GET" && ctx.path === "/form") {
    ctx.body = `
            <form action="/login" method="post">
                <input type="text" name="username"/>
                <input type="text" name="password"/>
                <button>提交</button>
            </form>
        `;
  } else {
    await next();
  }
});
// 此async方法 是不会等待内部的异步代码执行完毕
// const bodyParser = ctx => {
//   return new Promise((resolve, reject) => {
//     const arr = [];
//     ctx.req.on("data", chunk => {
//       arr.push(chunk);
//     });
//     ctx.req.on("end", () => {
//       resolve(Buffer.concat(arr).toString());
//     });
//   });
// };
// 中间件
app.use(async ctx => {
  if (ctx.method === "POST" && ctx.path === "/login") {
    ctx.body = ctx.request.body;
  }
});

app.listen(3000);
