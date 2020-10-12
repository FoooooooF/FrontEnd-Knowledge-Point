const express = require('./express');
const app = express(); 

app.post('/',function(req,res,next){
    console.log(1);
    next();
},
function(req,res,next){
    console.log(1);
    next()
},function(req,res,next){
    console.log(1);
})

app.listen(3000);

// 1.最进本的路由
// 2.创建了一个应用系统 实现了应用和路由的拆分
// 3.express 解构体系
// 4.只有当调用了get 方法listen 才创建路由系统,在外层layer会简单的判断一下方法的存在性
// 5.中间件

// 直接就会创建路由系统

// app.post('/',function(req,res){
//     console.log('post ok')
// })
// app.get('/',function(req,res){
//     console.log('get ok')
// })
// app.get('/',function(req,res,next){ // 可以对某个请求做一系列操作
//     console.log(1);
//     next();
// },function(req,res,next){
//     console.log(2);
//     next();
// },
// function(req,res,next){
//     console.log(3);
//     next();
// });
// app.get('/',function(req,res,next){
//     console.log(4);
// })
// app.listen(3000);
