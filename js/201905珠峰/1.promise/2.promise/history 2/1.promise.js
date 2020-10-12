let Promise = require('./promise');
let fs = require('fs');
let p = new Promise((resolve,reject)=>{ 
    // 读取文件成功后 调用成功 
    throw new Error('出错了');
    fs.readFile('./name.txt','utf8',function(err,data){
        if(err){
            return reject(err); 
        }
        resolve(data);
    })
})
// 每个promise的实例上都有一个then方法
// promise 有多个状态如果成功会让成功的函数 依次执行
// 如果失败会让失败的函数 依次执行
p.then((value)=>{ // fulfilled
    console.log('成功',value);
},(reason)=>{ // rejected
    console.log('失败',reason);
});
// p.then((value)=>{ // fulfilled
//     console.log('成功',value);
// },(reason)=>{ // rejected
//     console.log('失败',reason);
// });


// then的链式调用 finnaly all race 测试咱们自己的promise
// generator  co库
// async + await