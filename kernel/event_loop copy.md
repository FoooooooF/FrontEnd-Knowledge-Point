# js 运行原理 和 event loop
    面试题：setTimeout、Promise、Async/Await 的区别
## 1. 一道面试题引发的血案
```js
    // 今日头条面试题
    async function async1() {
        console.log('async1 start')
        await async2()
        console.log('async1 end')
    }
    async function async2() {
        console.log('async2')
    }
    console.log('script start')
    setTimeout(function () {
        console.log('settimeout')
    })
    async1()
    new Promise(function (resolve) {
        console.log('promise1')
        resolve()
    }).then(function () {
        console.log('promise2')
    })
    console.log('script end')
```
题目的本质，就是考察setTimeout、promise、async await的实现及执行顺序，以及JS的事件循环的相关问题。

答案：
```
    script start
    async1 start
    async2
    promise1
    script end
    async1 end
    promise2
    settimeout
```
再看一个经典的例子：
```js
    const p = Promise.resolve();
    (async () => {
        await p;
        console.log('await end');
    })();
    p.then(() => {
        console.log('then 1');
    }).then(() => {
        console.log('then 2');
    });
```
答案：
```
    then 1
    then 2
    await end
```
你答对了吗？这里涉及到Microtasks、Macrotasks、event loop 以及 JS 的异步运行机制。

## 2. js运行原理 
首先补齐基础，来看一下js 引擎（如：V8）的运行原理，这位Philip Roberts小哥讲的非常好，运行过程都使用动画展现，过程非常生动，条理也很清楚，当然ppt也做的不错。
这是B站上带英文字幕的版本
[视频地址](https://www.bilibili.com/video/av37759434/)

这个是核心思想的截图
![evnet loop](./assets/event.png)

## 3. event loop Microtasks、Macrotasks（task）
小哥的视屏缺少了 Microtasks、Macrotasks（task）的部分，在此给他补上！
### 3.1 event loop
JS主线程不断的循环往复的从任务队列中读取任务，执行任务，其中运行机制称为事件循环（event loop）。

### 3.2 Microtasks、Macrotasks（task）
在高层次上，JavaScript 中有 microtasks 和 macrotasks（task），它们是异步任务的一种类型，Microtasks的优先级要高于macrotasks，microtasks 用于处理 I/O 和计时器等事件，每次执行一个。microtask 为 async/await 和 Promise 实现延迟执行，并在每个 Macrotasks（task） 结束时执行。在每一个事件循环之前，microtask 队列总是被清空（执行）。
下面是它们所包含的api：

    Microtasks
    - process.nextTick
    - promise
    - Object.observe (废弃)
    - MutationObserver

    Macrotasks
    - setTimeout
    - setImmediate
    - setInterval
    - I/O
    - UI 渲染


![微任务和任务之间的区别](./assets/tasks.jpg)

<!-- 图1: 微任务和任务之间的区别 -->

如上图所示，浏览器的event loop至少包含两个队列，macrotask队列和microtask队列。

Macrotasks包含生成dom对象、解析HTML、执行主线程js代码、更改当前URL还有其他的一些事件如页面加载、输入、网络事件和定时器事件。从浏览器的角度来看，macrotask代表一些离散的独立的工作。当执行完一个task后，浏览器可以继续其他的工作如页面重渲染和垃圾回收。

Microtasks则是完成一些更新应用程序状态的较小任务，如处理promise的回调和DOM的修改，这些任务在浏览器重渲染前执行。Microtask应该以异步的方式尽快执行，其开销比执行一个新的macrotask要小。Microtasks使得我们可以在UI重渲染之前执行某些任务，从而避免了不必要的UI渲染，这些渲染可能导致显示的应用程序状态不一致。

ECMAScript规范并没有提及到event loop。实际上event loop是定义在[HTML规范(HTML Standard)](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)里的，这里也讨论了microtask和macrotask。ECMAScript规范在谈及处理promise回调时提到了jobs（其和microtask类似）。即使event loop是定义在HTML规范里的，其他的宿主环境如Node.js也使用了相同的概念。

Event loop的实现应该至少使用一个队列用于处理Macrotasks，至少一个队列处理Microtasks。

Event loop的实际实现通常分配几个队列用于处理不同类型的Macrotasks和Microtasks。这使得可以对不同的任务类型进行优先级排序。例如优先考虑一些性能敏感的任务如用户输入。另一方面，因为实际上存在很多JavaScript宿主环境，所以有的event loop使用一个队列处理这两种任务也不应该感到奇怪。

Event loop基于两个基本原则：
- 同一时间只能执行一个任务。
- 任务一直执行到完成，不能被其他任务抢断。

<!-- ![微任务和任务之间的区别](./assets/tasks.jpg) -->

上图还包含了一些细节：

两个任务队列都放置在event loop外，这表明将任务添加和任务处理行为分离。在event loop内负责执行任务（并从队列里删除），而在event loop外添加任务。如果不是这样，那么在event loop里执行代码时，发生的任何事件都被忽略，这显然不合需求，因此我们将添加任务的行为和event loop分开进行。

两种类型的任务同时只能执行一个，因为JavaScript基于单线程执行模型。任务一直执行到完成而不能被其他任务中断。只有浏览器可以停止任务的执行;例如如果某个任务消耗了太多的内存和时间的话，浏览器可以中断其执行。

所有的microtasks都应该在下次渲染前执行完，因为其目的就是在渲染前更新应用状态。

浏览器通常每秒尝试渲染页面60次，以达到每秒60帧（60 fps），这个帧速率通常被认为是平滑运动的理想选择。这意味着浏览器尝试每16ms渲染一帧。上图中“update rendering”操作在事件循环中进行，这是因为在呈现页面时，页面内容不应该被另一个任务修改。这意味着如果我们应用实现平滑的效果，单个事件循环中不能占据太多时间。单个任务和由该任务生成的所有microtasks应该在16毫秒内完成。

当浏览器完成页面渲染后，下次event loop循环迭代中可能发生三种情况：
- event loop在另一个16 ms之前执行的“is rendering needed”的判断处。因为更新UI是一个复杂的操作，如果没有明确要求渲染页面，浏览器可能在本次迭代中不执行UI渲染。

- event loop 在上次渲染后约16 ms处达到“Is rendering needed”判断处。在这种情况下，浏览器更新UI，用户会认为应用比较流畅。

- 执行下次任务（及其所有相关的microtask）花费时间大大超过16ms。这样浏览器将无法按照目标的帧速率重新渲染页面，UI也将不会更新。如果运行任务代码不占用太多时间（超过几百毫秒），这种延迟甚至可能感知不到，尤其是对于没有太多动画的页面。另一方面，如果我们花费太多时间，或者页面中含有动画，用户可能认为网页缓慢和没有响应。在最坏的情况下，如果任务执行超过几秒钟，用户的浏览器会显示“无响应脚本”消息。

处理事件时应注意其发生的频率和处理所需时间。如在处理鼠标移动事件时应该格外小心。移动鼠标会导致大量的事件排队，因此在该鼠标移动处理程序中执行任何复杂的操作都可能导致应用变得很不流畅。


下面看一个例子：
```js
// 1. 开始执行
console.log(1)	// 	2. 打印 1
setTimeout(function () {	// 6. 浏览器在 0ms 后，将该函数推入任务队列
    console.log(2)	// 7. 打印 2
    Promise.resolve(1).then(function () {	// 8. 将 resolve(1) 推入任务队列  9. 将 function函数推入任务队列
        console.log('ok')	// 10. 打印 ok
    })
})	// 3.调用 setTimeout 函数，并定义其完成后执行的回调函数
setTimeout(function (){		// 11. 浏览器 0ms 后，将该函数推入任务队列
    console.log(3)	// 12. 打印 3
})  // 4. 调用 setTimeout 函数，并定义其完成后执行的回调函数
// 5. 主线程执行栈清空，开始读取 任务队列 中的任务
// output： 1  2 ok 3
```
JS 主线程拥有一个 执行栈（同步任务） 和 一个 任务队列（microtasks queue），主线程会依次执行代码，

- 当遇到函数（同步）时，会先将函数入栈，函数运行结束后再将该函数出栈；

- 当遇到 task 任务（异步）时，这些 task 会返回一个值，让主线程不在此阻塞，使主线程继续执行下去，而真正的 task 任务将交给 浏览器内核 执行，浏览器内核执行结束后，会将该任务事先定义好的回调函数加入相应的 **任务队列（microtasks queue/ macrotasks queue）** 中。

- 当JS主线程清空执行栈之后，会按先入先出的顺序读取microtasks queue中的回调函数，并将该函数入栈，继续运行执行栈，直到清空执行栈，再去读取任务队列。

- 当microtasks queue中的任务执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行microtask queue，依次执行下去直至所有任务执行结束。

这就是 JS的异步执行机制

## 4. async await、Promise、setTimeout 笔试题
- setTimeout
```js
console.log('script start')	//1. 打印 script start
setTimeout(function(){
    console.log('settimeout')	// 4. 打印 settimeout
})	// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')	//3. 打印 script start
// 输出顺序：script start->script end->settimeout
```
- Promise

Promise本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果，一个 Promise 实例。
```js
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```
当JS主线程执行到Promise对象时，

promise1.then() 的回调就是一个 task 

promise1 是 resolved 或 rejected ：那这个 task 就会放入当前事件循环回合的 microtask queue

promise1 是 pending：这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中

setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况

回到文章开头经典的例子：
```js
const p = Promise.resolve(); // 1. p 的状态为 resolve；
(async () => {  
    await p; // 2. 返回，并将 函数体后面的语句 console.log('await end') 放入下一个事件循环的 microtask queue 中
    console.log('await end'); // 6. 执行，打印 await end
})();
p.then(() => { // 3. p 的状态为 resolve,会把 p.then() 放入当前事件循环的 microtask queue中。
    console.log('then 1'); // 4. 执行，打印 then 1
}).then(() => {
    console.log('then 2'); // 5. 执行，打印 then 2，当前 microtask queue 结束，运行下一个 microtask queue
});
// 输出结果：then 1->then 1->await end
```
例如：
```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
// 输出结果：script start->script end->promise1->promise2->setTimeout
```
- async await
```js
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end
```
async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

举个例子：
```js
async function func1() {
    return 1
}

console.log(func1())
```
在这里插入图片描述
很显然，func1的运行结果其实就是一个 Promise 对象。因此我们也可以使用 then 来处理后续逻辑。
```js
func1().then(res => {
    console.log(res);  // 1
})
```
await 的含义为等待，也就是 async 函数需要等待 await 后的函数执行完成并且有了返回结果（ Promise 对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。


## reference
1. [浏览器的Tasks、microtasks、 queues 和 schedules](https://github.com/sisterAn/blog/issues/21)
2. [HTML系列：macrotask和microtask](https://zhuanlan.zhihu.com/p/24460769)
3. [Event loop 及 macrotask & microtask（有视频）](https://zhuanlan.zhihu.com/p/76131519)
4. [JavaScriptCore的MacroTasks及MicroTasks源码解析](https://zhuanlan.zhihu.com/p/63912129)
5. [HTML Living Standard](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)
6. [并发模型与事件循环 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
7. [拆解JavaScript中的异步模式](https://zhuanlan.zhihu.com/p/67815990)
8. [Tasks, microtasks, queues and schedules :star:](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)