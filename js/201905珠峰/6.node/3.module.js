// 模块
// 1）解决命名冲突的问题 不能解决变量重名问题
// 2) 会污染全局变量
// 3) 自执行函数来实现
// 4）独立的  在node中每个js都是一个模块
// 浏览器 请求是异步的 amd cmd 
// node中是如何实现的：
// 1) 读取文件 同步读取
// 2) 读取完后增加 自执行函数,并且默认返回module.exports

// node模块 分为三种 核心模块 fs path vm
// 1) accessSync判断文件是否存在
// 2) exists
// let fs = require('fs');
// fs.accessSync('./.gitignore')

let path = require('path');
// path.join()  path.resolve()  path.dirname()
// path.extname()  path.basename()
console.log(path.join(__dirname,'a','b','/'));
// process.cwd() 有/的时候需要用join
console.log(path.resolve(__dirname,'a','b','/'));
console.log(path.dirname(__dirname)); // 取父路径
console.log(path.extname('1.min.js'))
console.log(path.basename('1.min.js','.js'))

// 让字符串执行 eval
// new Function
// vm模块执行了文件
let vm = require('vm'); // 虚拟机模块

// 沙箱
var hello = 'xxx'
vm.runInThisContext('console.log(hello)')


