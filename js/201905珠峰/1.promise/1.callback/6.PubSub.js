let fs = require('fs'); // fileSystem
 // 希望两次都完成 后 分别打印最终结果 在打印一次已经处理完毕
// 发布 emit 订阅 on  一种一对多的关系 [fn,fn,fn]
class Events{
    constructor(){this.stack = [];}
    on(callback){this.stack.push(callback); }
    emit(){this.stack.forEach(callback=>callback())}
}
let events  = new Events();
let school = {};
events.on(function(){
    if(Object.keys(school).length === 2){
        console.log(school) 
    }
})
events.on(function(){
    console.log('当前获取完毕')
})
// 前端 服务端 好多原理都是基于发布订阅模式的
fs.readFile('./name.txt','utf8',function(err,data){ // 5s
    school.name = data;
    events.emit();
});
fs.readFile('./age.txt','utf8',function(err,data){ // 3s
    school.age = data;
    events.emit();
});
// 观察者模式 他是基于发布订阅模式的
// 发布和订阅 两者没有直接关系
// 观察者模式 被观察的 观察者  vue
// 把 观察者 放到被观察者中
// 小宝宝 很开心 把我放到小宝宝的内部 小宝宝不开心了 会通知我他不开心了