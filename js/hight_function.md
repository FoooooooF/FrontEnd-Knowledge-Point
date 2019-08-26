
# 实现add方法
```js
add(1); 	// 1
add(1)(2);  	// 3
add(1)(2)(3)；  // 6
add(1)(2, 3);   // 6
add(1, 2)(3);   // 6
add(1, 2, 3);   // 6
```
分析中的一个写法
可以实现 add(1)(2)(3)；  // 6
```js
function add(a) {
    function sum(b) { // 使用闭包
    	a = a + b; // 累加
    	return sum;
    }
    sum.toString = function() { // 重写toString()方法
        return a;
    }
    return sum; // 返回一个函数
}
```

实现 1：
```js
function currying(fn, length) {
  length = length || fn.length; 	// 注释 1
  return function (...args) {			// 注释 2
    return args.length >= length	// 注释 3
    	? fn.apply(this, args)			// 注释 4
      : currying(fn.bind(this, ...args), length - args.length) // 注释 5
  }
}
```
实现 2：
```js
const currying = fn =>
    judge = (...args) =>
        args.length >= fn.length
            ? fn(...args)
            : (...arg) => judge(...args, ...arg)
```
其中注释部分

注释 1：第一次调用获取函数 fn 参数的长度，后续调用获取 fn 剩余参数的长度

注释 2：currying 包裹之后返回一个新函数，接收参数为 ...args

注释 3：新函数接收的参数长度是否大于等于 fn 剩余参数需要接收的长度

注释 4：满足要求，执行 fn 函数，传入新函数的参数

注释 5：不满足要求，递归 currying 函数，新的 fn 为 bind 返回的新函数（bind 绑定了 ...args 参数，未执行），新的 length 为 fn 剩余参数的长度

# reference
[【进阶 6-1 期】JavaScript 高阶函数浅析 #36](https://github.com/yygmind/blog/issues/36#%E6%80%9D%E8%80%83%E9%A2%98)
[【进阶 6-2 期】深入高阶函数应用之柯里化](https://github.com/yygmind/blog/issues/37)