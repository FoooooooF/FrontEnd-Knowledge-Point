// 箭头函数 特点
// 没有this 没有 arguments  没有prototype
// 如果箭头函数的参数是一个 可以省略括号

// let fn  = (...args)=>{
//     console.log(args);
// }
// console.log(fn());
let a = 100;
// let this = window
let obj = {
    a:1,
    fn:()=>{
        // let this = obj
        setTimeout(()=>{
            console.log(this.a)
        })
    }
}
obj.fn();


// 模板字符串
let name = '珠峰';
let age = 10;
let str = "<ul><li>${name} ${age}</li>";
// 让正则少匹配 可以使用 .+?  [^}]+
let result = str.replace(/\$\{([^}]+)\}/g,function(){
    return eval(arguments[1])
});
console.log(result);


