const express = require('./express');
const app = express(); // app 其实是一个实例 是一个应用的实例

app.get('/',function(req,res){
    res.end('hello');
});
app.get('/hello',function(req,res){
    res.end('hello');
});
app.get('/world',function(req,res){
    res.end('world');
});
app.listen(3000);
