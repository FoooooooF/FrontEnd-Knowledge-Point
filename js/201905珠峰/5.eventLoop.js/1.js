// 单线程 主线程 setTimeout ajax click
// 进程中包含着线程

// 主线程 ui  js  如果js是多线程会出现哪些问题？
// 默认代码执行的时候 会在执行栈中执行
// function a(){ // 执行上下文  作用域  js静态作用域
//     let x = 1;
//     function b(){ // 作用域链
//         console.log(x);
//         function c(){

//         }
//         c();
//     }
//     b();
// }
// a()

// 栈 先进来的后出去
// 队列 [].push  先进先出 [].shift()


setTimeout(()=>{
    console.log(0);
})
setTimeout(()=>{
    console.log(1);
})
setTimeout(()=>{
    console.log(2);
})
Promise.resolve().then(()=>{ // promise setTimeout
    console.log('then')
});
console.log('logger');


// ---------
setTimeout(()=>{
    console.log('settimeout1')
    Promise.resolve().then(()=>{
        console.log('then1')
    })
    Promise.resolve().then(()=>{
        console.log('then2')
    })
    Promise.resolve().then(()=>{
        console.log('then3')
    })
})
setTimeout(()=>{
    console.log('settimeout2')
})

Promise.resolve().then(()=>{
    console.log('then2')
})

// 1.主   当主栈执行完后 会清空then的队列 依次清空，取出一个回调执行
// 2.定时器 可能存放着 then的方法，执行完后 在清空then的这个队列
// 3.then 

// 浏览器在执行script脚本的时候 就是一个宏任务
// 宏任务 ui渲染 script 事件 ajax setitmeout
// promise.then


const p =Promise.resolve();
;(()=>{
    const implicit_promise = new Promise(resolve =>{
        const promise = new Promise(res=>res(p));
        // 执行顺序  promise 需要等到 内部的resolve(p)
        promise.then(()=>{
            console.log('after:await');
            resolve()
        })
    });
    return implicit_promise
})();
p.then(()=>{ 
    console.log('tick:a');
}).then(()=>{
    console.log('tick:b');
}).then(()=>{
    console.log('tick:c');
});
// tick:a tick:b after:await tick:c
// 浏览和node环境 在11版本之后 一样的 node -v 11





async function async1(){ // async 是怎么执行的
    console.log('async1 start')
    await async2()
    console.log('async1 end')
    // node 10 版本以下 会编译出一个then
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end');
// script start  
// async1 start
// async2
// promise1
// script end
// 'async1 end'
// promise2
// setTimeout
