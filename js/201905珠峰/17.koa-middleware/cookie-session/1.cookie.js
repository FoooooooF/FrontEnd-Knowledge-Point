const http = require('http');
http.createServer((req,res)=>{
    if(req.url == '/read'){
        // 读取cookie
        // count=10; name=zf => {count:10,name:zf}  name=1&age=2
        res.end(req.headers.cookie ||'empty');
    }
    // domain 域名 不能跨域 可以与子域共享   当前域名 限制写入cookie的域名
    // path在哪个路径下能生效  可以减少cookie的传输 /
    // expires 绝对 max-age 相对
    // http Only 是否能在客户端更改
    if(req.url === '/write'){
        // 如果客户端不停的读取 需要续命 7天免登陆
        res.setHeader('Set-Cookie',['count=10','name=zf']);
        res.end('write ok');
        return;
    }
   
    res.end('not found')
}).listen(3000);






// localStorage sessionStorage cookie session 区别
// localStorage(你不删除一直在) 没有跨域 sessionStorage(文件一关闭就消失了) vuex redux ->sessionStorage
// localStorage 5M
// indexDB
// 解决http无状态的问题
// cookie (每次请求会自动带过去) 可以保持通信 4k
// 不要什么都放到cookie里 会造成流量浪费 合理设置cookie
// 存放到客户端，每次请求会带过去 (不要存放敏感信息)

