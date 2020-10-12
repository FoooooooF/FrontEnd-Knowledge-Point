// export 只能导出一个接口
// export let a = 1;
// export let b = 2;
let a = 1;
let b = 2;

// 一起导出a,b两个接口
// as 语法可以重命名
setInterval(()=>{
    a++;
},1000)
export { a as c, b as default };

// {a,b,default:hello}
// export default 'hello'
// export default => {b as default}

