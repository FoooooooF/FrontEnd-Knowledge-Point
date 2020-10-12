const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const whiteList = ['b.zhufeng.cn']
http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url)
    let filePath = path.join(__dirname,pathname);
    fs.stat(filePath,function(err,statObj){
        if(err){
            res.statusCode = 404;
            res.end();
            return
        }
        if(statObj.isFile()){
            // mime  header
            if(/(\.jpg)|(\.png)$/.test(pathname)){
                //http://b.zhufeng.cn:3000/index.html
                let referer = req.headers['referer'] || req.headers['referrer'];
                // b.zhufeng.cn:3000
                if(referer){
                    let refererHostName = url.parse(referer).hostname;
                    let hostName = req.headers.host.split(':')[0];
                    if(refererHostName === hostName || whiteList.includes(refererHostName)){
                        fs.createReadStream(filePath).pipe(res);
                    }else{
                        fs.createReadStream(path.resolve(__dirname,'2.jpg')).pipe(res);
                    }
                }else{
                    fs.createReadStream(filePath).pipe(res);
                }
            }else{
                fs.createReadStream(filePath).pipe(res);
            }
            return
        }else{
            res.statusCode = 404;
            res.end();
            return
        }
    })
}).listen(3000);
