// 生成器 =》 迭代器的
// 函数 里面的声明 *  yield 来实现
// 会暂停
// function * read(){
//     try{
//         console.log(1);
//         yield 1  // 产出
//         console.log(2);
//         yield 2
//         console.log(3);
//     }catch(err){
//         console.log(err);
//     }
// }
// let it = read(); // iterator
// console.log(it.next());
// it.throw('出错了'); // 抛出错误 让tryCatch 来捕获

// function * buy(){
//     let a = yield 1;
//     console.log(a);
//     let b = yield 2;
//     console.log(b);
//     return b;
// }
// let it = buy();
// it.next('hello'); // 第一次的next传递参数是无效的
// it.next('world');
// it.next('zf');

// 先读取 name.txt 在读取age.txt

// generator + promise 来使用
let fs = require('fs').promises;

// promise 要通过then  generator 可以省略then方法
function* read() {
    // try{
        let content = yield fs.readFile('./name.txt','utf8');
        let age = yield fs.readFile(content,'utf8');
        let a = yield age + 100;
        return a;
    // }catch(err){
    //     console.log(err);
    // }
}
// co 库

function co(it){
    return new Promise((resolve,reject)=>{
        // 异步迭代 next
        function next(data){
           let {value,done} = it.next(data);
           if(!done){
               Promise.resolve(value).then(data=>{
                  next(data)
               },reject);
           }else{
                resolve(value);
           }
        }
        next();
    });
}
co(read()).then(data=>{
    console.log(data);
});

// let it = read();
// let {value,done} = it.next();
// value.then(function(data){
//     let {value,done} = it.next(data);
//     value.then(function(data){
//       let {value,done} = it.next(data);
//       value.then(function(data){
//         let {value,done} = it.next(data);
//         console.log(value);
//       })
//     })
// },function(err){
//     it.throw(err);
// })



// async + await koa + async + await
// react
// 语法糖
let fs = require('fs').promises
async function read() {
    try{
        let content = await fs.readFile('./name1.txt','utf8');
        let age = await fs.readFile(content,'utf8');
        let r = await 100
        return r;
    }catch(err){
        console.log(err);
    }
}
// async函数返回的是一个promise
read().then(r=>{
    console.log(r);
});

// generator-runtime搜索 generator简单实现
// async + await 就是 generator + co 库


// 回调 -》 promise -》 generator -》 async + await



// 作业 1: 柯理化  反柯理化  
// 2) Promise.try()是如何实现的
// 3） 整理一下 讲过的所有的promise方法
// 练习



