const express = require('./express');
const app = express(); 
// 路径参数 提前处理参数
// 发布订阅模式 function + next
app.param('id',function(req,res,next,value,key){
   console.log('id1')
    next();
})
app.param('id',function(req,res,next,value,key){
    console.log('id2')
    next();
})
app.param('name',function(req,res,next,value,key){
   console.log('name')
    next();
})
app.param('ccc',function(req,res,next,value,key){
    console.log('ccc')
    next();
})
app.get('/user/:id/:name',function(req,res){
    res.end(JSON.stringify(req.params))
});
app.listen(3000);
 