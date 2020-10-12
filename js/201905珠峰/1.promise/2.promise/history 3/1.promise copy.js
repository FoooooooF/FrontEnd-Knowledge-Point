
// promise 回调地狱
// 链式调用 $.css().css()
// 下一个人输入是上一个人输出
let fs = require('fs');
// 1） 把异步的方法变成promise
function read(filePath){
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,'utf8',function(err,data){
            if(err){
              return reject(err);
            }
            resolve(data);
        });
    })
}
// promise 的链式调用 (如果是一个promise 就不是普通值)
// 如果then方法中的成功或者失败 执行的时候发生错误 会走下一个then的失败的回调
// 如果then方法返回了一个失败的promise他会走外层then的失败的回调
read('./name.txt').then(function(data){
    return 1
}).then(data=>{
    console.log(data);
})
// fs.readFile('./name.txt','utf8',function(err,data){
//     fs.readFile(data,'utf8',function(err,data){
//         console.log(data);
//     })
// });

// 在promise中实现链式调用 靠的不是返回this
// let p = new Promise((resolve,reject)=>{
//     throw new Error();
// }).then(null,err=>{ // 已经走到catch 这个promise 已经是失败态了
//     return 100;
// })
// p.then(()=>{ // 返回了一个新的promise

// })