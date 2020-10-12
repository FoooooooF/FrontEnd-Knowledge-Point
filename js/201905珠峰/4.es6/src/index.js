// 装饰器   AOP  高阶函数
// 装饰模式

// 1) 包装类 包装类中的属性 类中的方法
// 装饰类  ：可以在类上 扩展一些方法 或者属性
@add
class My{
    @enumerable PI = 3.14; // 不可枚举
    @readonly r = 3.15
}
function add(target){
    target.type = 'my'
}
function readonly(target,key,descriptor){// Object.defineproperty(obj,pi,{})
    // console.log(target,key,descriptor.initializer());
    descriptor.writable = false;
    // setTimeout(()=>{
    //     console.log(My.prototype === target);
    // })
}
function enumerable(target,key,descriptor){
    console.log(descriptor.enumerable)
    descriptor.enumerable = false;
}
let my = new My();
for(let key in my){
    console.log(key);
}



class Animal{
    @enumerable
    @readonly PI = 3.4
    @beforeSay
    say(){
        console.log('say')
    }
}

function beforeSay(target,key,descriptor){
    let oldSay = descriptor.value
    descriptor.value = function(){
        console.log('before say')
        oldSay.call(this)
    }
}
let animal = new Animal();
for(let key in animal){
    console.log(key);
}

// 装饰器多个 时候怎么执行
@logger2()
@logger1()
class Logger{

}
function logger1(){
    console.log('outter 1')
   return function(){
        console.log('logger1');
   }
}   
function logger2(){
    console.log('outter 2')
    return function(){
        console.log('logger2');
    }
}
// 洋葱模型
// 如果装饰器是函数 会直接执行，内部装饰类的时候会从内部依次传递到外部去

// mixin 混合 1） 怎么实现 类的混合 属性的混合      Vue.mixin()


