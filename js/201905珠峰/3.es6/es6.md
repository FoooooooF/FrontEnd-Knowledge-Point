## 一.课程主题：
掌握es6的应用第二节

## 二.课程规划

- 掌握es6模块使用
- 掌握类的使用(继承) 装饰器
- 数组常见方法(reduce, map,filter...)
- 箭头函数的应用
- 模板字符串的使用



## 课程内容

##  (一).ES6中的模块

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系

一个文件就是一个模块，想让外部能使用这个变量就必须export变量

### 1).模块的导出和模块的导入 

模块导入会导致变量提升,并且import语句只能用在最顶层作用域上。

- ```javascript
  export let a = 1;  // export导出的是接口不是具体的值
  import * as obj from './a.js';
  import {a} from './a.js';
  ```

### 2).模块的动态绑定 

- ```javascript
  let obj = 1;
  setInterval(()=>{obj++;},1000) //   外部使用这个变量也会发生变化
  export {
      obj
  };
  ```

### 3).模块导出的命名问题    

- ```javascript
  export {
      a as default,
      b,
  }
  import _,* as obj from './a.js';
  console.log(_,obj);
  _ = '不能修改变量'
  
  ```

### 4).模块的默认导出  

- ```javascript
  export default a // 只是导出的时候给a重命名为default而已，default后面导出的都是具体的值
  export {
      b,
  }
  ```

### 5).导入模块并导出  

- ```javascript
  ESexport let a = 1;
  export {obj} from './b.js'; // 当前模块下并不能使用obj这个值
  ```

### 6).import 动态导入语法

- ```javascript
  import('./a.js').then(data=>{
  console.log(data.default);
  });
  ```



## (二.)ES6中的类

在es6之前生成实例对象是通过构造函数的方式，在es6中提供了类

### 构造函数类的继承方式

- ```javascript
   Animal.call(this)
   Tiger.prototype.__proto__ = Animal.prototype;
   Object.setPrototypeOf(Tiger.prototype,Animal.prototype)
   Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}});
   Tiger.prototype = new Animal();
  ```



### 1).new.target用法  

- ```javascript
  class Animal {
      constructor(){
          if(new.target === Animal){
              throw new Error('不能实例化动物类');
          }
      }
      eat(){ console.log('吃饭') }
  }
  class Tiger extends Animal{}
  let animal = new Animal();
  animal.eat();
  ```

### 2).类的访问器用法  

- ```javascript
  class Tiger extends Animal{
      constructor(){
          super();
          this._age = 10;
      }
      get age(){
          return this._age;
      }
      set age(val){
          this._age = val;
      }
  }
  let tiger = new Tiger();
  ```

### 3).静态方法和静态属性

- ```javascript
  class Animal {
      eat(){
          console.log('吃饭')
      }
      static type(){
          return '哺乳类'
      }
      static get MyKind(){
          return '老虎'
      }
  }
  class Tiger extends Animal{
  }
  console.log(Tiger.MyKind);
  ```

### 4).super的应用

- ```javascript
  class Animal {
      eat(){
          console.log('吃饭')
      }
      static type(){
          return '哺乳类'
      }
  }
  class Tiger extends Animal{
      constructor(){
          super();// 指代的是父类
      }
      static getType(){
          return super.type(); // 指代的是父类
      }
      eat(){
          super.eat(); // 指代的是父类原型对象
      }
  }
  let tiger = new Tiger();
  console.log(Tiger.getType());
  console.log(tiger.eat());
  
  ```

### 5).装饰器的应用

装饰器最终需要返还一个函数

- ```javascript
  
  @log1()
  @log2()
  class MyClass{}
  function log1(){
      console.log('outer1')
      return function(target){ // 装饰类指代的是当前类本身
          console.log('inner1');
      }
  }
  function log2(){
      console.log('outer2')
      return function(){
          console.log('inner2');
      }
  }
  ```

### 6.)修饰类中原型上的方法

- ```javascript
  class MyClass{
      @enumerable(false) // 是否可枚举
      getName(){
          return 'hello';
      }
  }
  function enumerable(boolean){
      return function(target,key,descriptor){
          //value.enumerable = true;
         return {
              ...descriptor,    
              enumerable:boolean,
         }
      }
  }
  ```



### 7.)修饰类中实例的属性

- ```javascript
  class MyClass{
      @readonly PI = 3.14
  }
  
  function readonly(target,key,value){
      value.writable = false;
  }   
  let my = new MyClass();
  my.PI  = 3.15;
  console.log(my.PI)
  
  ```

### (三).数组的常见的方法

最常见的reduce的应用 (作业实现数组扁平化)

### compose方法

```
let compose = (...fns) => fns.reduce((a,b)=>(...args)=>a(b(...args)))
let compose = (...fns) => (...args)=>{
    let lastFn = fns.pop();
    return fns.reduceRight((a,b)=>b(a),lastFn(...args));
}
```



### 编写reduce

```
Array.prototype.reduce = function(callback,prev){
    // this = [1,2,3]
    for(let i = 0; i< this.length;i++){
       if(prev == undefined){
           // this[i] = 1  this[i+1] = 2
         prev = callback(this[i],this[i+1],i+1,this);
         i++;
       }else{
         prev = callback(prev,this[i],i,this);
       }
    }
    return prev;
};
```











































