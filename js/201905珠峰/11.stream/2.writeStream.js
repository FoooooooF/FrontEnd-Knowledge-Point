const fs = require('fs');

// 如果解决异步并发的问题
let ws = fs.createWriteStream('./a.txt',{
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    autoClose:true,
    start:0,
    highWaterMark:4
});
let flag = ws.write('123456','utf8',function(){
    console.log('写入成功')
})// buffer / string 写入内容 fs.write
console.log(flag)
flag = ws.write('55555',function(){
    console.log('写入成功')
})
console.log(flag)
flag = ws.write('6666',function(){
    console.log('写入成功')
})
console.log(flag)
flag = ws.write('7777',function(){
    console.log('写入成功')
})
console.log(flag);
ws.end('ok'); // 遗言
ws.write('123');// write after end 已经结束就不能再写入了

// 64k 写入 发现超过了我的预期，不要在给我了,如果在给我我只能放到内存中

// write end