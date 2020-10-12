const http = require('http');

http.createServer((req,res)=>{
    res.end('3000')
}).listen(3000);