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
            // no-store 表示的是不缓存
            // no-cache 缓存但是每次都像服务器发请求
            let clientHeader = req.headers['if-modified-since'];
            if(clientHeader){ // 第二次来
                let currentFileCtime = statObj.ctime.toGMTString();
                if(clientHeader === currentFileCtime){
                    res.statusCode = 304;
                    res.end(); // 没有返回文件中的内容
                    return;
                }
            }
            res.setHeader('Cache-Control','no-cache');
            res.setHeader('Last-Modified',statObj.ctime.toGMTString());
            fs.createReadStream(absPath).pipe(res);
        }
    })
}).listen(4000);
// 协商缓存 1） 根据文件的最后修改时间
// 并不精确 因为最后修改时间变化了 可能内容没有变化
// 可能1s内多次修改 是无法监控到的

// 我可以一个个比较  比较指纹