const express = require('express');

const app = express(); // app默认就是一个路由系统
const path = require('path');
const router = express.Router(); // 返还是一个方法

// koa koa-bodyparser   express body-parser
// koa-views            express 自带模板引擎
// koa-multer           express multer
// koa cookie get set   express set cookie-parser
// koa-session          express express-session       
router.get('/add',(req,res,next)=>{
    res.send('add');
})
router.get('/delete',(req,res,next)=>{
    res.send('delete');
})
app.use('/user',router)
app.listen(3000);
// 集成了路由系统 二级路由
