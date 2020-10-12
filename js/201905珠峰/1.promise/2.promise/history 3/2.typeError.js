let Promise = require('./promis')
let promise = new Promise((resolve,reject)=>{
    resolve();
});
let promise2 = promise.then(()=>{
    return 100; // resolve
})
promise2.then(function(){

},function(err){
    console.log(err);
});
// TypeError: Chaining cycle detected for promise #<Promise>

setTimeout(() => {
    console.log('settimeout')
}, 0);
while(true){

}