// 浅拷贝 Object.assign ... 如果是多层的话 就是浅拷贝 一层就是深拷贝

let obj = {name:'zf',age:{n:100},a:undefined,a:function(){},reg:/\d+/}
let obj1 = Object.assign(obj);
// obj1.age.n = 200;
// console.log(JSON.parse(JSON.stringify(obj)));

// 递归拷贝 (类型判断)
function deepClone(value,hash = new WeakMap){ // 弱引用，不要用map
    // null 和 undefiend 是不需要拷贝的
    if(value == null){ return value;}
    if(value instanceof RegExp){return new RegExp(value)}
    if(value instanceof Date){return new Date(value)}
    // 函数是不需要拷贝
    if(typeof value != 'object') return value;
    let obj = new value.constructor(); // [] {}
    // 说明是一个对象类型
    if(hash.get(value)){
        return hash.get(value)
    }
    hash.set(value,obj);
    for(let key in value){ // in 会遍历当前对象上的属性 和 __proto__指代的属性
        // 补考呗 对象的__proto__上的属性
        if(value.hasOwnProperty(key)){
            // 如果值还有可能是对象 就继续拷贝
            obj[key] = deepClone(value[key],hash);
        }
    }
    return obj
    // 区分对象和数组 Object.prototype.toString.call
}
// null / undefined
let o = {};
o.x = o;
let o1 = deepClone(o); // 如果这个对象拷贝过了 就返回那个拷贝的结果就可以了
console.log(o1);
