const express = require('./express');
const app = express(); 
// 路由中的next 和 中间件的next 是什么关系


app.use('/',function(req,res,next){
    console.log('middle')
   next();
})
app.use('/a',function(req,res,next){
    console.log('middle 2');
    next();
})
app.get('/a/b',function(req,res,next){
    next('error');
})

// 一般放在页面的最底部
app.use(function(err,req,res,next){
    console.log(1);
    next(err);
})
app.listen(3000);
