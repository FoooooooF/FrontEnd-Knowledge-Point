const express = require('express');

const app = express();
const path = require('path');
// 中间都是函数类型
app.use(express.static(__dirname));
// req/res 功能比较弱 
// 内部会初始化中间
app.get('/',(req,res,next)=>{
    console.log(req.path);
    console.log(req.query);

    // res.sendFile(path.resolve(__dirname,'4.static.js'))
    res.send({name:'zf'});
    // res.json({name:'age'}); 一般返回json都使用此方法
})
app.listen(3000);
// 集成了路由系统 二级路由