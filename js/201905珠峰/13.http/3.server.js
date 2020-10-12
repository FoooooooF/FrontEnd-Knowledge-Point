const http = require('http');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
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
            let client = req.headers['if-none-match'];
            let fileContent = fs.readFileSync(absPath,'utf8');
            let md5 = crypto.createHash('md5').update(fileContent).digest('base64')
            if(client){
               if(client === md5){
                    res.statusCode = 304;
                    res.end();
                    return;
               }
            }
            res.setHeader('Cache-Control','no-cache');
            res.setHeader('Etag',md5);
            fs.createReadStream(absPath).pipe(res);
        }
    })
}).listen(4000);
// 协商缓存 1） 根据文件的最后修改时间
// 并不精确 因为最后修改时间变化了 可能内容没有变化
// 可能1s内多次修改 是无法监控到的

// 我可以一个个比较  比较指纹
// 读取一个视频文件 1g 修改时间 + 文件的大小 ， 取文件的开头，去摘要
// 三种策略都采用


// EBGT1xgcyINArlsrF7uooQ==
// let md5 = crypto.createHash('md5');
// fs.createReadStream('./a.txt',{
//     highWaterMark:3
// }).on('data',function(chunk){
//     md5.update(chunk)
// }).on('end',function(){
//   console.log(  md5.digest('base64'))
// })
// EBGT1xgcyINArlsrF7uooQ
// EBGT1xgcyINArlsrF7uooQ==
// let md5 = crypto.createHash('md5').update('123123123123').digest('base64')
// console.log(md5)