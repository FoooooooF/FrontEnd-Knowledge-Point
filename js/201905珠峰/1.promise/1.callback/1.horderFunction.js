// 高阶函数 函数参数如果是函数，或者这个函数返回一个新的函数 我们就叫他高阶函数

// AOP 面向切片编程

// before函数  (this指向) 箭头函数的特点 after 函数
function say(who){
    console.log(who+'hello');
}
function say1(who){
    console.log(who+'hello');
}
Function.prototype.before = function(beforeFunc){
    // this  箭头函数中没有this  也没有arguments
    return (...args)=>{ // ['我']
        beforeFunc();
        this(...args);
    }
}
// beforeSay 是一个包装后的函数
let beforeSay = say1.before(()=>{
    console.log('开始说话')
})
beforeSay('我');
//闭包的概念：你不知道的js

// react中的事务

// 防抖 一直触发 只触发一次
// 节流  不停触发 按时触发 
// lodash 防抖 + 节流