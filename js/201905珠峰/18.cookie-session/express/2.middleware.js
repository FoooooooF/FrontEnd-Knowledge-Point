let app = {
    arr:[],
    use(fn){
        this.arr.push(fn);
    }
}
app.use( function(req,res,next){
    console.log(1);
    setTimeout(()=>{
        next();
    },3000)
    console.log(2)
})
app.use(function(req,res,next){
    console.log(3);
    next();
    console.log(4)
})
app.use(function(req,res,next){
    console.log(5);
    next();
    console.log(6)
});
function dispatch(index){
    if(index === app.arr.length) return 
    let fn = app.arr[index]; // 获取第一个中间件函数执行
    fn({},{},dispatch.bind({},index+1)); // 让函数执行 传入下一个中间
}
dispatch(0);
// koa 和 epress中间件的区别 
//  koa支持async + await 
// koa处理错误比较优雅  
// express不太容易