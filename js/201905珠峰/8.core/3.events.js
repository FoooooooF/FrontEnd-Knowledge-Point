const EventEmitter =require('./events');
const util = require('util')
function Girl(){
}
util.inherits(Girl,EventEmitter);
const girl = new Girl();

girl.on('newListener',(type)=>{
    process.nextTick(()=>{ 
        if(type === 'data'){
          girl.emit('data','4561');
        }
    })
})
// girl.on('newListener',(type)=>{
//     process.nextTick(()=>{ 
//         if(type === 'data'){
//             girl.emit('data','123',123,1231,23);
//         }
//     })
// })
let listener = (arg)=>{ // 触发完依次后就会移除掉此方法
    console.log('绑定了data',arg);
}
girl.once('data',listener);
girl.off('data',listener);

girl.once('data',(arg)=>{
    console.log('绑定了data',arg);
})
// 发布订阅
// on 每绑定依次 到时候就会触发 once只触发依次
// on off once newListener