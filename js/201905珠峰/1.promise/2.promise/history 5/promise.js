const PENDING = "PENDING";
const SUCCESS = "FULFILLED";
const FAIL = "REJECTED";
// 严谨 🇬应该判断 别人的promise 如果失败了就不能在调用成功 如果成功了不能在调用失败
function resolvePromise(promise2, x,resolve,reject) { 
    if(promise2 === x){
       return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
    }
    let called;
    if(typeof x === 'function' || (typeof x === 'object' && x != null)){
      try{
        let then = x.then;  // then 可能是getter object.defineProperty
        if(typeof then === 'function'){  // {then:null}
           then.call(x,y=>{ 
             if(called) return; // 1)
             called = true;
              resolvePromise(promise2,y,resolve,reject); 
           },r=>{
             if(called) return; // 2)
             called = true;
              reject(r);
           }) 
        }else{ 
          resolve(x);
        }
      }catch(e){
        if(called) return; // 3) 为了辨别这个promise 不能调用多次
        called = true;
        reject(e);
      }
    }else{
      resolve(x);
    }
}
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = value => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = SUCCESS;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    const reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = FAIL;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) { // .catch(function(){}) .then(null,function)
  onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
  onRejected =  typeof onRejected === 'function'?onRejected:err=>{throw err}
    let promise2;
    promise2 = new Promise((resolve, reject) => {
      if (this.status === SUCCESS) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
      if (this.status === FAIL) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.onRejectedCallbacks.push(()=> {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });
    return promise2;
  }
}
// 希望测试一下这个库是否符合我们的promise A+规范
// promises-aplus-tests
Promise.defer = Promise.deferred = function(){
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise;
// npm i promises-aplus-tests -g

// promise 相关方法
// generator