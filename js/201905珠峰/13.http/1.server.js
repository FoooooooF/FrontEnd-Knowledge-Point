const http = require('http');
const path = require('path');
const fs = require('fs');
http.createServer((req,res)=>{
    let {pathname} = require('url').parse(req.url);
    console.log(pathname)
    let absPath = path.join(__dirname,pathname);
    fs.stat(absPath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            res.end();
            return ;
        }
        if(statObj.isFile()){
            // 打开缓存
            // 10s内在发起同样的请求 就别再来找我了
            res.setHeader('Cache-Control','max-age=20');
            // 为了兼容低版本 ， 而且返回的状态码依旧是200 图片强制缓存 更新不频繁的文件
            res.setHeader('Expires',new Date(Date.now()+20*1000).toGMTString())
            fs.createReadStream(absPath).pipe(res);
        }
    })
}).listen(4000);