const express = require('./express');
const path = require('path');
const app = express();
// 内置的静态服务中间件
app.use(express.static(__dirname));

app.set('views','views1');// 设置模板存放位置
// 告诉.html后缀 需要用 __express这个方法来渲染
app.set('view engine','html'); // 省略文件后缀
app.engine('.html',require('ejs').__express);
// 模板引擎 koa-views 


app.get('/hello',function(req,res,next){
    console.log('h')
  res.render('index',{name:'zf'});
})
app.listen(3000);