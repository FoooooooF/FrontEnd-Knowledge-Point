// 发布订阅 订阅的时候 会把内容存到一个数组里 
// 发布的时候 需要循环数组依次执行

// 真正的发布订阅 你可以维护一个列表 {'dispatch':[xxx,xxx],'broadcaset':[qqq]}
// vue eventBus  $emit('dispatch1');  $on('dispatch',xxx)  $on('dispatch',xxx)

const EventEmitter =require('events');
const util = require('util')
function Girl(){
}
util.inherits(Girl,EventEmitter);
const girl = new Girl();

// 当用户绑定了data事件 我就触发此函数
girl.on('newListener',(type)=>{
    console.log(type);
})

girl.on('吃饭',()=>{ // {'吃饭':[fn1,fn2]}
    console.log('吃饭前喝水')
});
let listener = ()=>{
    console.log('吃完前洗手')
}
girl.on('吃饭',listener);

girl.off('吃饭',listener); // 去数组中删除掉

// girl.emit('吃饭'); // Pub Sub库

// on emit off newListener