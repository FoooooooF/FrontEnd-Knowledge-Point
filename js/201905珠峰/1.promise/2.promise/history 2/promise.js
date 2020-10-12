const SUCCESS = 'fulfilled'
const FAIL = 'rejected';
const PENDING = 'pending'
class Promise {
  constructor(executor) {
    this.status = PENDING; // 默认是等待态
    this.value= undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = []; // 存储成功的所有的回调 只有pending的时候才存储
    this.onRejectedCallbacks = []; // 存储所有失败的
    let resolve = (value) => { // 成功
        if(this.status === PENDING){
            this.value = value;
            this.status = SUCCESS;
            this.onResolvedCallbacks.forEach(fn=>fn());
        }
    };
    let reject = (reason) => { // 失败
        if(this.status === PENDING){ 
            this.reason = reason;
            this.status = FAIL;
            this.onRejectedCallbacks.forEach(fn=>fn());
        }
    };
    try{
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
  }
  then(onFulfilled,onRejected){ // 默认看一下状态调用对应的函数
    if(this.status === SUCCESS){
        onFulfilled(this.value);
    }
    if(this.status === FAIL){
        onRejected(this.reason);
    }
    if(this.status === PENDING){
        this.onResolvedCallbacks.push(()=>{
            onFulfilled(this.value);
        });
        this.onRejectedCallbacks.push(()=>{
            onRejected(this.reason);
        })
    }
  }
}
module.exports = Promise;
