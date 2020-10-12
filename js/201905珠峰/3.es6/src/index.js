// es6

// class Animal {
//   constructor(type) {
//     this.type = type; // 实例属性
//   }
//   // a = 1; // es7 语法 实例属性
//   eat() {
//     // 不要使用 这个函数 在外面声明使用
//     console.log("eat", this);
//   }
//   //    static a = 1; // es7
//   static get a() {
//     // es6
//     return "hello";
//   }
//   //    static say(){
//   //         console.log('say')
//   //    }
//   //    get a(){ // getter setter  可以操作一个属性 通过set和get方法
//   //     return 100;
//   //    }
//   //    set a(){

//   //    }
// }
// let animal = new Animal("哺乳类");
// console.log(Animal.a);
// console.log(animal.__proto__.hasOwnProperty('a'));
// let eat = animal.eat.bind(animal);
// eat();

// 1) 会做this判断
// function Animal(){
//     if(!(this instanceof Animal)){
//         throw new Error('without new ')
//     }
// }
// Animal();

// 如果是公共方法 直接写即可，公共属性 需要通过 get / set
// 静态的 属性和方法 static get / fn



/// ------------
// 类的特点 封装 继承 多态 类的重写
class Animal {
    constructor(type){
        this.type = type;
    }
    get xxx(){
        return 'xxx';
    }
    static flag = 'animal';
    static fn(){
        return 'fn'
    }
    eat(){
        console.log('eat');
    }
}
// 类是单继承的
// super 在构造函数中,和静态方法中 指代的是父类
// 在原型方法中指代的是父类的原型
// Tiger.__proto__ = Animal
class Tiger extends Animal{ // call + Object.create
    constructor(type){
        super(type) // super.call(this)
        this.name = []
        console.log(this);
    }
    static fn(){
        return super.fn();
    }    
    eat(){
       console.log(super.xxx);
        super.eat();
        console.log('吃肉')
    }
}
let tiger = new Tiger('哺乳类');
console.log(tiger.eat());

// new 的原理 会在内部产生一个对象 这个对象上要有 实例属性
// 还可以找到当前类的原型
// 如果构造函数返回一个对象 或者函数 返回结果就是我们当前的构造函数的返回值



// this
// 变量提升
// 闭包
// 执行上下 作用域链
// call bind apply
// http://www.javascriptpeixun.cn/course/194/tasks

// eventloop node 核心 + commonjs 规范