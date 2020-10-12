const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
http.createServer((req,res)=>{
    // 动态服务
    
    // 静态服务
    let {pathname,query} = url.parse(req.url);

    // pathname 有可能是客户端发起的接口请求
    let method = req.method;
    // 允许那个域 来访问我
    console.log(req.headers);
    if(req.headers.origin){ // 如果跨域了 才走跨域逻辑
        res.setHeader('Access-Control-Allow-Origin',req.headers.origin); // 和 * 是一样
        // 允许哪些方法访问我
        res.setHeader('Access-Control-Allow-Methods','GET,PUT,DELETE,POST,OPTIONS');
        // 允许携带哪些头
        res.setHeader('Access-Control-Allow-Headers','token');
        // 设置options请求的间隔事件
        res.setHeader('Access-Control-Max-Age','10');
        res.setHeader('Access-Control-Allow-Credentials',true)
        // 跨域 cookie 凭证 如果跨域是不允许携带cookie
        if(method === 'OPTIONS'){
            res.end(); // 浏览器就知道了 我可以继续访问你
            return;
        }
    }
   
    if(pathname === '/user'){ // 你发送的是api接口
        switch(method){
            case 'GET':
                // res.setHeader('Set-Cookie','name=zf');
                res.end(JSON.stringify({name:'zf'}))
                break;
            case 'POST':
                let arr = [];
                console.log('log')
                req.on('data',function(chunk){
                    arr.push(chunk);
                })
                req.on('end',function(){
                    console.log(Buffer.concat(arr).toString());
                    res.end('{"a":1}')
                })
                
        }
        return 
    }

    let filePath = path.join(__dirname,pathname);
    fs.stat(filePath,function(err,statObj){
        if(err){
            res.statusCode = 404;
            res.end();
            return
        }
        if(statObj.isFile()){
            // mime  header
            fs.createReadStream(filePath).pipe(res);
            return
        }else{
            res.statusCode = 404;
            res.end();
            return
        }
    })
}).listen(3000);