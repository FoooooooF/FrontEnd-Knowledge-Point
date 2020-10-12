// promise - all; 全部 解决多个异步 同步的问题,“同步”多个异步的结果
let fs = require('fs').promises; // 新版本 10 版本新增的 
// 计数器
function isPromise(value){
    if(typeof value === 'function' || (typeof value === 'object' && value !== null)){
        if(typeof value.then === 'function'){
            return true;
        }
    }
    return false;
}
Promise.all = function(values){
    return new Promise((resolve,reject)=>{
        let arr = []; // arr[3] = 2  arr.length = 4
        let i = 0;
        let processData = (key,value)=>{
            arr[key] = value; // after函数
            if(++i === values.length){
                resolve(arr);
            }
        }
        for(let i = 0 ; i < values.length;i++){
            let current = values[i];
            if(isPromise(current)){
                current.then(y=>{
                    processData(i,y);
                },reject);
            }else{
                processData(i,current);
            }
        }
    })
}
Promise.all([fs.readFile('./name.txt','utf8'),fs.readFile('./age.txt','utf8'),1,2]).then(data=>{
    console.log(data);
});
// fs.readFile('./name.txt','utf8').then(data=>{
//     console.log(data);
// })
// Promise.race = function(values){
//     return new Promise((resolve,reject)=>{
//         for(let i = 0 ; i < values.length;i++){
//             let current = values[i];
//             if(isPromise(current)){
//                 current.then(resolve,reject);
//             }else{
//                resolve(current);
//             }
//         }
//     })
// }
// Promise.race([fs.readFile('./name.tx1t','utf8'),fs.readFile('./age.txt','utf8')]).then(data=>{
//     console.log(data);
// },err=>{
//     console.log(err);
// });

// 如何终止一个promise （中断promise） promise 超时
let p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(123);
    }, 3000);
})
function wrap(promise){
    let abort;
    let newPromise = new Promise((resolve,reject)=>{ // 创建了一个promise
        abort = reject;
    });
    let p = Promise.race([newPromise,promise]);
    p.abort = abort;
    return p;
}
let p1 = wrap(p);
setTimeout(() => {
    // 让这个promise 变成失败态
    p1.abort('errror');
}, 2000);
p1.then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
});
// xhr.bort  fetch 方法取消不了
// generator async + await

