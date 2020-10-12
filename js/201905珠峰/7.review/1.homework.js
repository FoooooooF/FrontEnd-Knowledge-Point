// 函数柯里化
function add(a, b, c, d) {
  return a + b + c + d;
}
// 把函数拆分成若干小的部分,方便组合
function currying(fn, args = []) {
  // 我每次都到这个数组中
  let len = fn.length;
  return (..._) => {
    args.push(..._);
    if (args.length < len) {
      // [1,2,2,4]  == 4
      return currying(fn, args);
    }
    return fn(...args);
  };
}
const fn = currying(add)(1, 2)(2); // 先保存每次调用后的参数
const isType = (type, content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
};
// 可以预置参数
const isString = currying(isType)("String");
console.log(isString("123"));

// 柯里化的反函数

let add = a => b => c => d => {
  return a + b + c + d;
};
// reduce 
function uncurrying(fn){
    return (...args)=>{
        args.forEach(item=>{
            fn =  fn(item)
        });
        return fn
    }
}
let r = uncurrying(add)(1,2,3,4);
console.log(r);
// 反柯里化  放大函数适用范围 别人的东西我可以拿过来直接用，这里的this我可以手动传入
const uncurrying = fn =>(...args)=>{
    return fn.call(...args)
}
let checkType = uncurrying(Object.prototype.toString);
let r = checkType(1);
console.log(r);
// let check = Object.prototype.toString.call(1); // [object Number]

// -------------
Function.prototype.uncurrying = function(){
    return (...args)=>{
        // Function.prototype.call 取到call的方法
        // call / apply的作用 1)改变this 2) 让函数执行
        // let callFunction = Function.prototype.call
        // callFunction 中的this 变成 Object.prototype.toString
        // Object.prototype.toString.call(1)
        return this.call(...args);
        // return Function.prototype.call.apply(this,args);
    }
}
let checkType = Object.prototype.toString.uncurrying();
console.log(checkType('hello'));


// 数组的flatten 展平
// r.toString().split(',')
// Array.prototype.myFlat = function(n=1){
//     if(n > 0) { return this; }
//     return this.reduce((a,b)=>{
//         if(Array.isArray(b)){ // 只要是是数组就递归展开即可
//             return a.concat(b.myFlat(--n));
//         }else{
//             return [...a,b];
//         }
//     },[])
// }
// let r = [1,[2,[3,[4,[5,[6]]]]]].myFlat();
// console.log(r);

function Animal(){
    this.a = 1; // 实例属性?
}
Animal.prototype.say = function(){
}
// new 的原理就是继承实例属性 和 公共属性
function mockNew(cons){
   let obj = {};
   obj.__proto__ = Animal.prototype; // 继承公有属性
   let r = cons.call(obj); // 可能返回一个结果
   return typeof r === 'object' ? r:obj
}
let animal = mockNew(Animal)
console.log(animal.a,animal.say);

// mixin {a:1} {b:2} => Object.assign({a:1},{b:2})
// Object.defineProperty(Fn.prototype,'a',1)

// 子类 有个父类
const mixin = (superClass)=>{
    return class extends superClass{
      beforeCreate(){
        console.log('mixin')
        super.beforeCreate();
      }
    }
}
const mixin1 = (superClass)=>{
  return class extends superClass{
    beforeCreate(){
      console.log('mixin')
      super.beforeCreate();
    }
  }
}
class Parent {
    beforeCreate(){
      console.log('父亲执行')
    }
}
class Child extends mixin1(mixin(Parent)){
  beforeCreate(){
     super.beforeCreate();
     console.log('儿子执行')
  }
}
let child = new Child();
child.beforeCreate();


// Promise.try
function fn(){
  //throw new Error('err123');
  // return new Promise((resolve,reject)=>{
  //   setTimeout(()=>{
  //    reject('err')
  //   },5000)
  // })
}
Promise.try = function(fn){
  return new Promise((resolve,reject)=>{
    resolve(fn())
  })
}
// 借助了promise的处理错误的特点 同时可以捕获同步和异步
Promise.try(fn).then(null,err=>{
    console.log(err);
});
