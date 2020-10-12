// node 方法 异步的i/o
// file system
let fs = require('fs');
// 异步的 回调
// let school = {}
// // 异步并发问题
// function out(){
//     if(Object.keys(school).length == 3){
//         console.log(school)
//     }
// }
// 解决异步并发问题 计数器
function after(times,callback){
    let school = {}
    return function out(key,value){
        school[key] = value;
        if(--times === 0){
            callback(school);
        }
    }
}
let out = after(2,(school)=>{
    console.log(school)
});
// 发布订阅
fs.readFile('./name.txt','utf8',function(err,data){ // 5s
    // school.name = data;
    out('name',data);
});
fs.readFile('./age.txt','utf8',function(err,data){ // 3s
    // school.age = data;
    out('age',data);
});

// 异步代码会等待同步先执行完
// 分别读取到name 和 age 属性 读取后拿到最后的结果