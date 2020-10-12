// node源码 多数都是构造函数


function EventEmitter(){
    this._events  = Object.create(null);
}
// 订阅 创建关系
EventEmitter.prototype.on = function(eventName,callback){ // {'吃饭':[]}
    if(!this._events){
        this._events = Object.create(null);
    }
    if(eventName !== 'newListener'){
        if(this._events['newListener']){
            this._events['newListener'].forEach(fn=>fn(eventName))
        }
    }
        let arr = this._events[eventName] || (this._events[eventName] = []);
        arr.push(callback)
 
}
EventEmitter.prototype.once = function(eventName,callback){
    const once = (...args)=>{ // 高阶函数
        callback(...args);// 先执行原有的逻辑
        this.off(eventName,once);// 在将这个函数移除掉
    }
    once.l = callback
    this.on(eventName,once); // {'吃饭':[fn1.fn2]}
}
// 让对应的函数依次执行
EventEmitter.prototype.emit = function(eventName,...args){
    if(!this._events){
        this._events = Object.create(null);
    }
    if( this._events[eventName]){
        this._events[eventName].forEach(fn => fn(...args));
    }
}
EventEmitter.prototype.off = function(eventName,fn){
    if( this._events[eventName]){
        //  this._events[eventName] = [once]
        this._events[eventName] = this._events[eventName].filter(item=>{
            return  item !== fn && item.l !== fn
        })
    }
}
module.exports = EventEmitter;