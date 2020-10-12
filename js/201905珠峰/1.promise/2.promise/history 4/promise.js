const PENDING = "PENDING";
const SUCCESS = "FULFILLED";
const FAIL = "REJECTED";
// 返还的那个新的promise x 是then方法中的返回值 
// let x = 1;
// Object.defineProperty(obj,'then',{
//   get(){
//     x++;
//     if(x ===2){
//       throw new Error();
//     }
//   }
// });

function resolvePromise(promise2, x,resolve,reject) { // 考虑的非常全面
    if(promise2 === x){
       return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
    }
    // 判断x的类型
    // promise 有n种实现 都符合了这个规范 兼容别人的promise

    // 怎么判断 x是不是一个promise 看他有没有then方法
    if(typeof x === 'function' || (typeof x === 'object' && x != null)){
      try{
        let then = x.then; // 去then方法可能会出错
        if(typeof then === 'function'){ // 我就认为他是一个promise
           then.call(x,y=>{ // 如果promise是成功的就把结果向下传，如果失败的就让下一个人也失败
              resolvePromise(promise2,y,resolve,reject); // 递归
           },r=>{
              reject(r);
           }) // 不要使用x.then否则会在次取值
        }else{ // {then:()=>{}}
          resolve(x);
        }
      }catch(e){
        reject(e);
      }
    }else{ // x是个？ 常量 
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

module.exports = Promise;
