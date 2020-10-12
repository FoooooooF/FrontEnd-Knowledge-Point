// es5 构造函数 模拟类 函数的名字大写

function Animal(){
    this.type = '哺乳类';
    this.a = {};
}

Animal.prototype.home = {}
Animal.prototype.fn = function(){
    
}
// 类一类事物  具体的一个实例
// 私有属性 是外面拿不到的  
// 1.实例上的属性
// 2.公共属性
// 3.静态方法 静态属性 只能通过类来调用
let animal1 = new Animal(); // new 实现原理
let animal2 = new Animal(); // new 实现原理
console.log(animal1);

// 每个对象上都会有一个__proto__ 找所属类的原型 .__proto__ = X.prototype
console.log(animal1.__proto__==Animal.prototype);
console.log(Animal.prototype.__proto__ == Object.prototype)
console.log(Object.prototype.__proto__);

console.log(Object.__proto__ == Function.prototype)
console.log(Function.__proto__ == Function.prototype);
console.log(Object.__proto__ === Function.__proto__);

// constructor
console.log(Animal.prototype.constructor === Animal);
console.log(animal1.constructor); // 获取的是类 无法拿到类实例的属性 可以拿到静态属性或者方法
