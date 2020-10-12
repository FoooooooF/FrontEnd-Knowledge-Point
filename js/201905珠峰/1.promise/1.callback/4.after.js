// lodash after 在执行多少次之后在执行
// 做异步的并发处理
function after(times,callback){
    return function(){
        if(--times === 0){
            callback();
        }
    }
}
let fn = after(3,()=>{
    console.log('执行三次后才执行')
});
fn();
fn();
fn();
// 写一个异步的例子