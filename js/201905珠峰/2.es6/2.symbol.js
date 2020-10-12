// Symbol 独一无二 


let s1 = Symbol('my'); // 描述这个symbol 内部会将描述符 toString
let s2 = Symbol('my');

let obj = {
    [s2]:1 // 如果这个属性是用symbol 来声明的，不可枚举
}
console.log(s1 === s2);

for(let key in obj){
    console.log(obj[key]);
}
console.log(Object.getOwnPropertySymbols(obj)); // Symbol的Object.keys()

// Symbol.for
let s3 = Symbol.for('xxx'); //  如果有这个symbol 并不会重新声明
let s4 = Symbol.for('xxx');
console.log(Symbol.keyFor(s4)); 

// js中原始数据类型 string number boolean null undefined symbol / object


// Symbol 具备着原编程的功能 想改变默认系统级的方法
// 11种
class MyArray {  
    static [Symbol.hasInstance](instance) {
      return Array.isArray(instance);
    }
 }
console.log([] instanceof MyArray);

// 可以做 私有属性 默认js 中没有私有属性