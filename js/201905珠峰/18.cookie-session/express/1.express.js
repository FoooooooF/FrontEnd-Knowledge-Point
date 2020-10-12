// 内部继承了路由系统
// 内置中间件
const express = require('express');
const app = express();
// 不支持promise 等待效果
// 1) 决定是否向下执行
// 2) 可以扩展属性 和方法
// 3) 可以进行权限校验 
// 4) 可以匹配对应的路径
// 决定哪个路径可以匹配到
app.use('/a',function(req,res,next){
    console.log(1);
    next('内容');
    console.log(2)
})
app.use('/',function(req,res,next){
    console.log(3);
    next();
    console.log(4)
})
app.use(function(req,res,next){
    console.log(5);
    next();
    console.log(6)
})
// 如果任何一个next函数出错了 会调过 所有中间件，执行参数为四个的中间件
app.use((err,req,res,next)=>{
    console.log(err); //专门处理错误的
})

app.listen(3000);
