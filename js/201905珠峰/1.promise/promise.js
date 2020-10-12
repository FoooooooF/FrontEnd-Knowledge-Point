const PENDING = "PENDING";
const SUCCESS = "FULFILLED";
const FAIL = "REJECTED";
// 返还的那个新的promise x 是then方法中的返回值 
function resolvePromise(promise2, x,resolve,reject) { // 考虑的非常全面
    if(promise2 === x){
       return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
    }
    // 判断x的类型
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
      console.log(e);

      reject(e);
    }
  }
  // 同一个promise then 多次
  then(onFulfilled, onRejected) {
    let promise2;
    // 可以不停的调用then方法,返还了一个新的promise
    // 异步的特点 等待当前主栈代码都执行后才执行
    promise2 = new Promise((resolve, reject) => {
      if (this.status === SUCCESS) {
        setTimeout(() => {
          try {
            // 调用当前then方法的结果，来判断当前这个promise2 是成功还是失败
            let x = onFulfilled(this.value);
            // 这里的x是普通值还是promise
            // 如果是一个promise呢？
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            console.log(err);
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
            console.log(err);
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
              console.log(err);
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
                console.log(err);
              reject(err);
            }
          });
        });
      }
    });
    return promise2;
  }
}

module.exports = Promise;
