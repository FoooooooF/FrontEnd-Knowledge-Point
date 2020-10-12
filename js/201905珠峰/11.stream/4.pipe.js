// 拷贝

// let ReadStream = require('./ReadStream');
// let WriteStream = require('./WriteStream');

// let fs = require('fs');
// let rs = fs.createReadStream('./a.txt');
// let ws = fs.createWriteStream('./c.txt');
// ws.write('hello');
// ws.write('hello');
// let rs = new ReadStream('./a.txt',{
//     highWaterMark:4
// });
// let ws = new WriteStream('./b.txt',{
//     highWaterMark:3
// });
// 读流.pipe(写流) // 管道  ws.end();
// 异步 读一点写一点 不会导致内存溢出，缺点：看不到文件的内容了 

// on("data") on("end") pipe write end


// fs中createReadStream 继承了可读流接口
// 可读流接口上有一个方法 read  父类会调用子类自己的_read方法 
// 子类要实现一个_read ，自己实现读取的方法调用push方法将读取到的结果传入
// 默认就会被发射出来 
// let {Readable,Writable,Duplex} = require('stream');
// // let fs = require('fs');
// class MyReadStream extends Readable{
//     constructor(){
//         super();
//         this.index =0
//     }
//     _read(){
//         if(this.index == 0){
//             let r= fs.readFileSync('a.txt');
//             this.push(r);
//             this.index = -1;
//         }else{
//             this.push(null);
//         }
//     }
// }
// let myreadStream = new MyReadStream();
// myreadStream.on('data',function(data){
//     console.log(data);
// })
// myreadStream.on('end',function(data){
//     console.log('end');
// })

// 可写流
// fs中createWriteStream 继承了可写流接口
// 可读流接口上有一个方法 write  父类会调用子类自己的_write方法 
// 子类要实现一个_write ，fs.write() 如果写入完毕后 需要清空缓存
// 如果需要触发drain 内部会自动触发

// class MyWriteStream extends Writable{
//     _write(chunk,encoding,callback){
//         console.log(chunk);
//         callback(); // clearBuffer 
//     }
// }
// let mywrite = new MyWriteStream();
// mywrite.write('hello')
// mywrite.write('hello')
// mywrite.write('hello')
// mywrite.end('ok');

// 双工流

// class My extends Duplex{
//     _write(){

//     }
//     _read(){

//     }
// }
// let my = new My();

// 转化流 压缩 可以把写入转化成可读取的 gzip

// crypto MD5摘要算法 不能反解  雪崩 长度固定
let crypto = require('crypto')
let r = crypto.createHash('md5').update('我爱你1').digest('base64');
console.log(r);


// 转化流 
// process.stdin.on('data',function(data){
//     process.stdout.write(data);
// })
let {Transform} = require('stream');

class Mytransform extends Transform{
    _transform(chunk,encoding,callback){ // 参数和_write方法是一样的
        this.push(crypto.createHash('md5').update(chunk).digest('base64'));
        callback(); // 清空缓存区
    }
}
let transform = new Mytransform();
process.stdin.pipe(transform).pipe(process.stdout);
// 流的四种方式

// 判断这个东西是不是一个流
let Stream = require('stream');
console.log(transform instanceof Stream); // 后面会经常用到 判断传入的是不是一个流对象


// http开头 http概念

