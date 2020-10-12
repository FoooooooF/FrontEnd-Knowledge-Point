const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');
const secret = 'zf';
http.createServer((req,res)=>{
    req.getCookie = function(key,options={}){
        // 解析cookie 通过对应的key 取到对应的值
        let value = querystring.parse(req.headers.cookie,'; ','=')[key];
        if(value){
            if(options.signed){
               let [v,sign] = value.split('.');
               let newSign = crypto.createHmac('sha256',secret).update(v+'').digest('base64').replace(/\/|\+|\=/g,'');
               if(sign === newSign){
                   return v
               }else{
                   return '';
               }
            }
        }else{
            return '';
        }
    }   
    let arr = [];
    res.setCookie = function(key,value,options={}){
        let args = [];
        if(options.httpOnly){
            args.push(`httpOnly=true`);
        }
        if(options.maxAge){
            args.push(`max-age=${options.maxAge}`);
        }
        if(options.signed){
            // sha256 加盐算法 md5
            let sign = crypto.createHmac('sha256',secret).update(value+'').digest('base64').replace(/\/|\+|\=/g,'');
            value = value+'.'+sign;
        }
        arr.push(`${key}=${value}`+'; '+args.join('; ')); // name=zf; httpOny:true; max-age:10 age=10
        res.setHeader('Set-Cookie',arr);
    }
    if(req.url == '/read'){
        console.log(req.headers.cookie)
        res.end(req.getCookie('name',{signed:true}));
    }
    if(req.url === '/write'){
        // 一般情况下服务端要设置httpOnly让客户端不能随意更改
        // 签名 加一个签名 如果客户端改掉了 我就不识别你
        res.setCookie('name','zf',{httpOnly:true,maxAge:100,signed:true});
        res.setCookie('age',10);
        return res.end('write ok');
    }
    res.end('not found')
}).listen(3000);