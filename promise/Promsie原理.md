## promise
### 链式调用原理
### finnal,race,all方法
#### finnal 无论成功与失败都执行
```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
}
```
#### all 等待所有异步返回后执行回到函数
1. 等待多个异步操作均有返回结果之后,pending->resolved
2. 有一个异步出现异常就 rejected 
```js
 function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
            if (!Array.isArray(promises)) {
                return reject(new TypeError("argument must be anarray"))
            }
            var countNum = 0;
            var promiseNum = promises.length;
            var resolvedvalue = new Array(promiseNum);
            for (var i = 0; i < promiseNum; i++) {
                (function (i) {
                        Promise.resolve(promises[i]).then(function (value) {
                                countNum++;
                                resolvedvalue[i] = value;
                                if (countNum === promiseNum) {
                                    return resolve(resolvedvalue)
                                }
                            }, function (reason) {
                                return reject(reason)
                            })
                })(i)
            }
    })
}
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
promiseAll([p1, p2, p3]).then(function (value) {
    console.log(value)
})
```

#### race执行异步返回最快的那个
1. 应为Promsie(new Promise)的状态改变是不可逆的
2. 一个Pormise的状态只可以改变一次 pending->resolve pending->rejected
```js
const _race = (p)=>{
	return new Promise((resolve, reject)=>{
		p.forEach((item)=>{
			Promise.resolve(item).then(resolve, reject)
		})
	})
}
```

## js原理
### 原型链,寄生组合式继承(p172)
### 访问器属性和数据属性(p139)
### 模拟new 操作符(p145)
```
// 木易杨
function create() {
	// 1、创建一个空的对象
    var obj = new Object(),
	// 2、获得构造函数，同时删除 arguments 中第一个参数
    Con = [].shift.call(arguments);
	// 3、链接到原型，obj 可以访问构造函数原型中的属性
    Object.setPrototypeOf(obj, Con.prototype);
    //var con= Con.bind(obj)

	// 4、绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
    //var ret=con();
    
	// 5、优先返回构造函数返回的对象
	return ret instanceof Object ? ret : obj;
};
```
### this的定义,不同情况下的指向
#### bind polyfill
```js
// 简化实现，完整版实现中的第 2 步
Function.prototype.bind = function (context) {
    var self = this;
    // 第 1 个参数是指定的 this，截取保存第 1 个之后的参数
		// arr.slice(begin); 即 [begin, end]
    var args = Array.prototype.slice.call(arguments, 1); 

    return function () {
        // 此时的 arguments 是指 bind 返回的函数调用时接收的参数
        // 即 return function 的参数，和上面那个不同
      	// 类数组转成数组
        var bindArgs = Array.prototype.slice.call(arguments);
      	// 执行函数
        return self.apply( context, args.concat(bindArgs) );
    }
}
```
### Object.getPrototype() 与Object.create() 比较
Object.crate() 方法是es5中的关于原型的方法， 这个方法会使用指定的原型对象以及属性去创建一个新的对象。
(MDN)Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
```js
Object.create(proto, [ propertiesObjecy ])
// subclass extends superclass
Child.prototype = Object.create(Parent.prototype);
```
　Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
```js
Object.setPrototypeOf(obj, prototype)
```
- create Polyfill
```js 
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject !== 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        //关键点
        function F() {}
        F.prototype = proto;

        return new F();
    };
}
```

### 高阶函数,函数柯里化(kurry)
> 柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
#### 节流 throttle
```js
// fn 是需要执行的函数
// wait 是时间间隔
const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}
```
#### 防抖 debounce
```js
// 实现 1
// fn 是需要防抖处理的函数
// wait 是时间间隔
function debounce(fn, wait = 50) {
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function(...args) {
      	// 如果已经设定过定时器就清空上一次的定时器
        if (timer) clearTimeout(timer)
      
      	// 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
```
## Vue
### 核心原理
### vuex vue-router
### 虚拟dom