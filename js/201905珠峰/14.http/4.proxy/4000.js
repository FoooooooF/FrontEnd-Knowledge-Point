const http = require('http');

http.createServer((req,res)=>{
    res.end('4000')
}).listen(4000);