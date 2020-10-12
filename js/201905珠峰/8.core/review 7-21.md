## 回顾

#### 1 关于函数

- 什么是高阶函数?  

  把函数作为参数或者返回值的一类函数。

- AOP (装饰模式)  柯里化函数 绑定参数

  AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，其实就是给原函数增加一层，不用管原函数内部实现

  ```javascript
  let arr = ['shift','push','unshift'];
  let proto = Object.create(Array.prototype);
  arr.forEach(method=>{
      proto[method] = function(){
          console.log('update');
          Array.prototype[method].call(this,...arguments);
      }
  })
  function fn(array){
      if(Array.isArray(array)){
          array.__proto__ = proto;
      }
  }
  ```

- 发布订阅模式  promise 一个promise 可以then多次、 观察者模式 (events on emit)  mvvm

  一种一对多的关系，发布者和订阅者是否有关联，观察者模式基于发布订阅模式

#### 2 promise

- promise 中的链式调用如何中断? 返回一个等待的promise

  ```
  Promise.resolve().then(()=>{	
  	return new Promise(()=>{
  		
  	})
  }).then(()=>{})
  ```

- Promise.finally实现原理?  Promise.resolve(()=>{}).then() 链的关系 一个promise返还一个promise会等待 Promise.resolve(promise)

- promise有哪些缺点？fetch 无法中断，但是可以丢弃本次请求  依然是基于回调的方式，好处可以扁平化处理我们的逻辑，处理错误比较方便  generator + co async + await  dva

  ```javascript
  function wrap(p1){
      let abort;
      let p2 = new Promise((resolve,reject)=>{
          abort = function(){
              reject('失败')
          }
      });
      let p =  Promise.race([p1,p2]); // race 是一个失败就失败  all 中有一个失败了就失败 如果都成功了才算成功
      p.abort = abort;
      return p;
  }
  
  let p = wrap(new Promise((resolve,reject)=>{
      setTimeout(() => {
          resolve();  
      }, 3000);
  }))
  p.then(()=>{},()=>{console.log('失败')})
  p.abort();
  ```

- generator &  co   * yiled  function next(){}   异步迭代 next函数 Symbol.iterator

- async + await  try catch 同步的写代码

  ```
  (async (){ // async 函数返回的是一个promise async 变成promise
    try{
  	 throw new Error(); it.throw()
    }catch(e){
  
    }
  })().then()
  ```

#### 3 ES6

- let & const (1.没有变量提升 2.不会污染全局作用域 3.不能重复声明 4）拥有自己的作用域 let {} )  import 提升到当前代码的顶部

- Symbol 第六种基本数据类型  独一无二  11 种symbol的定义方式  元编程

- spread (… 解构赋值和剩余运算符 只能用在最后一个参数)  深拷贝 如何深拷贝一个对象 递归

- set & map (weakMap)  去重       交集 并集  差集  v8引擎的垃圾回收

- defineProperty proxy、reflect (数据劫持 代理)  enumerable(是否可枚举)  writable (仅读的属性) getter setter

- es6中的类 (类的继承（公有 实例上的属性），静态属性，静态方法（static），super关键字,装饰器的应用)


- ES6中的模块化( 静态导入/动态导入)



## 课程规划

- 装饰器的应用 @ 实验型语法 ts

- arrowfunc (没有this，没有arguments，没有原型)

- compose方法  reduce map filter some every find findIndex 应用

- 模板字符串 (模板引擎的实现原理)  ejs jade nunjunks underscore handlerbars

- 浏览器事件环

  https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

- node核心概念&node事件环
- node的模块 commonjs规范



## 知识点

#### 1).宏任务微任务

- 微任务： promise.then ，MutationObserver，process.nextTick

- 宏任务：script ，ajax ， 事件，requestFrameAnimation， setTimeout ，setInterval ，setImmediate （ie下），MessageChannel ，I/O ，UI rendering。

>  微任务 会比宏任务快，js中会先执行script脚本



#### 2).浏览器事件环和node事件环

v10+执行的效果是一样的。给每个宏任务对应的都配置了一个队列 timer poll check (每个执行完后清空一次微任务)

```javascript
const p =Promise.resolve();
;(()=>{
    const implicit_promise = new Promise(resolve =>{
        const promise = new Promise(res=>res(p)); 
        promise.then(()=>{
            console.log('after:await');
            resolve()
        })
    });
    return implicit_promise
})();
p.then(()=>{ 
    console.log('tick:a');
}).then(()=>{
    console.log('tick:b');
}).then(()=>{
    console.log('tick:c');
});
```



```javascript
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
```

#### 3).进程和线程的区别 (node中的进程)

一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等

,进程表示一个程序，线程是进程中的单位  主线程只有一个 

1个进程可以占用1核cpu

- 多线程在单核cpu中其实也是顺序执行的，不过系统可以帮你切换那个执行而已，没有提高速度
- 多个cpu的话就可以在多个cpu中同时执行

> 单线程优点：解决切换上下文时间,锁的问题,节省内存

> node 主进程，在开多个子进程，里面包含着一个线程

#### 4).node中的全局对象  (可以直接调用的)

- process，buffer
- process.cwd() 可以改变 process.nextTick process.pid **process.argv** commander **process.env** 环境变量
- require,exports,module,\_\_filename,\_\_dirname (可以直接在模块内部被访问)

#### 5).node中的模块

- 模块分类 ES6module,commonjs规范 amd,cmd,umd
- commonjs规范  
  - 一个文件就是一个模块
  - 如果模块想给别人使用 module.exports  /  exports 同一个对象但是最终导出的是module.exports 
  - 如果想使用这个模块 require (同步读取文件，包一个自执行函数，vm.runInthisContext,传入export对象，最终返回的是exports 对象，所以就可以拿到其他模块的内容)
- 模块的查找规范
  	- 第三方模块 module.paths
  	- 如果文件和文件夹重名 先取文件，文件不能取到，找文件夹 package.json => main => index.js

#### 6).node的内置模块

- vm runInThisContext 很少
- path  resolve 绝对路径 join __dirname 如果有/ 那就用join   extname base name dirname
- fs readFile writeFile assess 