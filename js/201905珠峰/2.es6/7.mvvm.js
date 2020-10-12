function update(){
    console.log('数据变化~~~ mock update view')
}
let obj = [1,2,3]
// 变异方法 push shift unshfit reverse sort splice pop
// Object.defineProperty
let oldProto = Array.prototype;
let proto = Object.create(oldProto); // 克隆了一分
['push','shift'].forEach(item=>{
    proto[item] = function(){
        update();
        oldProto[item].apply(this,arguments);
    }
})
function observer(value){ // proxy reflect
    if(Array.isArray(value)){
        // AOP
        return value.__proto__ = proto;
        // 重写 这个数组里的push shift unshfit reverse sort splice pop
    }
    if(typeof value !== 'object'){
        return value;
    }
    for(let key in value){
        defineReactive(value,key,value[key]);
    }
}
function defineReactive(obj,key,value){
    observer(value); // 如果是对象 继续增加getter和setter
    Object.defineProperty(obj,key,{
        get(){
            return value;
        },
        set(newValue){
            if(newValue !== value){
                observer(newValue);
                value = newValue;
                update();
            }
        }
    })
}
observer(obj); 
// AOP
// obj.name = {n:200}; // 数据变了 需要更新视图 深度监控
// obj.name.n = 100;
obj.push(123);
console.log(obj);