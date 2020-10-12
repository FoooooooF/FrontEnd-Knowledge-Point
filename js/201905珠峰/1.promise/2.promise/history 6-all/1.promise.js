// let Promise = require('./promise');
let fs = require('fs');

// 封装read方法的时候
// function read(url){
//     // 延迟对象  Q库  减少套用
//     let defer = Promise.defer(); // {promise,resolve,reject}
//     fs.readFile(url,'utf8',function(err,data){
//         if(err)defer.reject(err);
//         defer.resolve(data);
//     });
//     return defer.promise
// }
// read('./name.txt').then(data=>{
//     console.log(data);
// })

// 当new promise的时候 如果resove 一个promise 会等待这个promise的执行结果
// let p = new Promise((resolve,reject)=>{
//     resolve(new Promise((resolve,reject)=>{
//         resolve(new Promise((resolve,reject)=>{
//             resolve(new Promise((resolve,reject)=>{
//                 resolve(new Promise((resolve,reject)=>{
//                     resolve(100)
//                 }))
//             }))
//         }))
//     }))
// })
// p.then(data=>{
//     console.log(data);
// })


// catch写的写法
// let p = new Promise((resolve,reject)=>{
//     reject(100);
// })
// p.catch((err)=>{
//     console.log(err);
// });

// // p.finnaly  try{}catch{}finnaly  无论如何都会执行
// let p = new Promise((resolve,reject)=>{
//     resolve(new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             resolve(199);
//         }, 2000);
//     }))
// })
// p.then(data=>{
//     console.log(data)
// })

// finally 的特点 无论如何都执行 ，但是如果返回的是一个promise需要等待这个promise之行完在继续向下执行

// 如何终止promise链？ 返回一个等待的promise
let promise = new Promise((resolve,reject)=>{
    resolve();
})
promise.then(function(){
    // 走到这 后面的then不要在执行了
    console.log(1);
    return new Promise(()=>{})
}).then(function(){
    console.log(2);
});

new Promise((resolve,reject)=>{
    reject(100)
}).finally(()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('finally')
            //resolve();
        }, 3000);
    });
}).then(data=>{
    console.log('data',data)
},err=>{
    console.log('err',err);
})

