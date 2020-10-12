
// 继承
// 实例的属性 公共属性


function Animal(name){
    this.type = '哺乳类'
    this.name = name;
}
Animal.prototype.eat = function(){
    console.log('吃饭')
}
function Tiger(name){
    Animal.call(name);
}
// 1)老虎增加方法 可以增加到自己的身上 还可以找到Animal原型
// Tiger.prototype = Animal.prototype 错误的
// Tiger.prototype.__proto__ = Animal.prototype
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype); //es6
// let tiger = new Tiger();
// console.log(tiger.eat());


// 2)Object.create()
function create(Pproto){
    let Fn = function(){}
    Fn.prototype = Pproto; // 把父类的原型 放到Fn上
    return new Fn(); 
}
// 让tiger的原型 执行 Fn函数的实例
// 找的时候 想找自己身上 找不到找对应的链 链放的是fn的实例，fn找不到 会找到父类的原型
// Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}});
// let tiger = new Tiger();
// console.log(tiger.constructor);

// 3) 用不到 不能给父类传递参数
// Tiger.prototype = new Animal(); // {动物的实例属性 公共属性}
// let tiger = new Tiger('xxx');
// console.log(tiger.name)
