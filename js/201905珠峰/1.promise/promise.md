## 一.课程须知

**周三 周五**晚上 20:00 - 22:00  **周日全天**: 上午：9:30 - 12:00  下午：14:00 - 18:00

**珠峰wifi**: zhufengpeixun  密码:12345678

**正式视频观看网站**:[http://www.javascriptpeixun.cn/course/720](http://www.javascriptpeixun.cn/course/720) 我的班级进入

**代码管理**: https://gitee.com/

**使用软件**:

vscode: https://code.visualstudio.com 安装code runner插件

git:         window git安装  mac 安装 homebrew  brew install git  

node:    10以上的版本 



## 二.课程主题

从0到1完美诠释异步编程。 **实现Promise**:https://promisesaplus.com/



## 三.课程规划

- 掌握高阶函数的使用，使用高阶函数解决异步问题。

- 掌握发布订阅模式和观察者模式

- 掌握promise核心应用，使用promise解决异步编程问题

- 实现一个完整的promise库

- 掌握promise中常见的面试题

- 扩展promise中常见方法 all,race,finnaly...

- 掌握generator的使用以及co库的应用 

- 异步终极解决方案async+await

  

## 四.必备知识点

####  关于函数

- 什么是高阶函数?    before函数  react事务 / type / after函数

  把函数作为参数或者返回值的一类函数。

- AOP (装饰模式) 

  AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，其实就是给原函数增加一层，不用管原函数内部实现

  ```
   *                       wrappers (injected at creation time)
   *                                      +        +
   *                                      |        |
   *                    +-----------------|--------|--------------+
   *                    |                 v        |              |
   *                    |      +---------------+   |              |
   *                    |   +--|    wrapper1   |---|----+         |
   *                    |   |  +---------------+   v    |         |
   *                    |   |          +-------------+  |         |
   *                    |   |     +----|   wrapper2  |--------+   |
   *                    |   |     |    +-------------+  |     |   |
   *                    |   |     |                     |     |   |
   *                    |   v     v                     v     v   | wrapper
   *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
   * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
   * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
   *                    | |   | |   |   |         |   |   | |   | |
   *                    | |   | |   |   |         |   |   | |   | |
   *                    | |   | |   |   |         |   |   | |   | |
   *                    | +---+ +---+   +---------+   +---+ +---+ |
   *                    |  initialize                    close    |
   *                    +-----------------------------------------+
   * 
  ```

- 发布订阅模式 、 观察者模式 (events on emit)

  一种一对多的关系，发布者和订阅者是否有关联，观察者模式基于发布订阅模式



## promise面试

- promise 中的链式调用如何中断?

- Promise.finally实现原理?  

- promise有哪些缺点？fetch 无法中断，但是可以丢弃本次请求  依然是基于回调的方式，好处可以扁平化处理我们的逻辑，处理错误比较方便

  ```javascript
  function wrap(p1){
      let abort;
      let p2 = new Promise((resolve,reject)=>{
          abort = function(){
              reject('失败');
          }
      });
      let p =  Promise.race([p1,p2]);
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
  
  ```javascript a
  // 1
  let p = new Promise((resolve,reject)=>{
      reject();
      resolve();
  });
  p.then(()=>console.log('成功'),()=>console.log('失败'));
  // 2
  const promise = new Promise((resolve,reject)=>{
      console.log(1);
      resolve();
      console.log(2);
  })
  promise.then(()=>{
      console.log(3);
  })
  // 3
  Promise.resolve(1)
  .then(res=>2)
  .catch(err=>3)
  .then(res=>console.log(res));
  // 4
  Promise.resolve(1)
  .then(x=>x+1)
  .then(x=>{throw new Error('My Error')})
  .catch(()=>1)
  .then(x=>x+1)
  .then(x=>console.log(x))
  .catch(console.error)
  ```
  
- generator &  co 

- async + await