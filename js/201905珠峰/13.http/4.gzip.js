// 压缩 转化流
const zlib = require('zlib');

// .gz
const fs = require('fs');
// let content = fs.readFileSync('./a.txt')
// zlib.gzip(content,function(err,data){
//     fs.writeFileSync('c.txt.gz',data)
// });
// gzip 压缩视频 服务器和浏览器说我用了哪种压缩 浏览器会自动解析
let content = fs.readFileSync('./c.txt.gz')
zlib.unzip(content,function(err,data){
    fs.writeFileSync('c.txt',data)
})

