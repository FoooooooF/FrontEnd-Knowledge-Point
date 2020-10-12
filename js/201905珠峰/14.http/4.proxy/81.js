const http = require('http');
// 代理服务器
const proxy = require('http-proxy').createProxy();
// http-proxy http.request
let map = {
    'a.zhufeng.cn:81':'http://localhost:3000',
    'b.zhufeng.cn:81':'http://localhost:4000'
}
// a.zhufeng b.zhufeng
http.createServer((req,res)=>{
    console.log(req.headers.host); // a.zhufeng.cn
    proxy.web(req,res,{
        target:map[req.headers.host]
    })
}).listen(81);


// koa express http
// express4 大而全 (es5来)处理异步都是基于事件
// koa 基于generator -> async + await 
// egg 基于koa来封装的

