const util = require('util');
const fs = require('fs');
const path = require('path');
// node api 所有的方法都是基于回调 第一个参数 永远err
// fs.readFile(path.resolve(__dirname,'1.txt'),'utf8').then(data=>{
//     console.log(data);
// })
const promisify = (fn)=>(...args)=>{
    return new Promise((resolve,reject)=>{
        //fs.readFile(path.resolve(__dirname,'1.txt'),'utf8',)
        fn(...args,(err,data)=>{
            if(err){return reject(err)}
            resolve(data);
        })
    })
}
// require('fs').promises
const promisifyAll = (obj)=>{
    for(let key in obj){
        obj[key] = promisify(obj[key]);
    }
}
promisifyAll(fs); // blueBird
// 写一个转化所有方的promise化方法
(async ()=>{
    let r = await fs.readFile(path.resolve(__dirname,'1.txt'),'utf8')
    console.log(r);
})();

// 继承 继承公有属性 原型上的属性
function Parent(){
    this.type = 'parent';
}
Parent.prototype.say = function(){
    console.log('say')
}
function Child(){

}
// Object.setPrototypeOf(Child.prototype,Parent.prototype);
util.inherits(Child,Parent); 
let child = new Child();
child.say();

// inherts  promisify