// console.log(Object.keys(global));

// global  windiw.window
// process 进程
// Buffer 16进制 2进制
// clearInterval clearTimeout
// setTimeout setInterval
// setImmediate clearImmediate
// console.dir(global,{showHidden:true});

console.log(this); // {}module.exports 我们文件在执行的时候为了实现模块化 外面特意套了一个函数而且this指向被改变了

// console.log(Object.keys(process)) 

// 1).argv   webpack --config webpack.config,js --port 3000
// let argv = process.argv.slice(2).reduce((prev,current,index,arr)=>{
//     if(current.includes('--')){
//         prev[current.slice(2)] = arr[index+1];
//     }
//     return prev
// },{});
// tj co commander
// 1) 可以配置命令快捷键（接受用户参数） 监听用户的动作
// let program = require('commander')
// program
//     .version('1.0.0')
//     .option('-p, --port <value>', 'config port')
//     .option('-c, --config <value>', 'config file')
//     .parse(process.argv);
// env 环境变量  export NODE_ENV=production  cross-env
 // 开发的时候 可能用到url 是 www.baidu.com  www.zf.cn
 let url = '';
 if(process.env.NODE_ENV === 'production'){
    url = ' www.zf.cn'
 }else{
     url = 'www.baidu.com'
 }
console.log(url);
// chdir  changeDiretory 当前进程的工作目录
// process.chdir('6.node');
console.log(process.cwd()) // current working dircotory
// nextTick promise.then
// node事件环 20分钟

// node中的模块