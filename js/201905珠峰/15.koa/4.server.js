const Koa = require('./koa/application');
// const Koa = require('koa')
const app = new Koa();
const fs = require('fs');
app.use(async ctx=>{
   ctx.body = fs.createReadStream('./package.json')
})
app.on('error',(err)=>{
    console.log(err,'----')
})
app.listen(3000);