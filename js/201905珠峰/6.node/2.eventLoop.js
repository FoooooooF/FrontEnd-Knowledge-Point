// node的事件环 libuv实现的一个事件环机制
setImmediate(()=>{
    console.log('setImmediate')
});
setTimeout(()=>{ // 1 - 4ms
    console.log('timeout')
});
// 真正的执行顺序是不一定的

let fs = require('fs');

fs.readFile('./package.json','utf8',()=>{
    setImmediate(()=>{
        console.log('setImmediate')
    });
    setTimeout(()=>{ // 1 - 4ms
        console.log('timeout')
    });
});

// 每个宏任务执行后都会清空微任务


// 如果希望当前主栈中代码执行后 就可以使用nextTick 微任务
// setImmediate(()=>{}) 宏任务
Promise.resolve().then(()=>{
    console.log('then')
})

process.nextTick(()=>{
    console.log('nextTick')
});
// puppetter
//timers poll check阶段