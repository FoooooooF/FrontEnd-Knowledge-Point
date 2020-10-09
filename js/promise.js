const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const PENDING = 'pending';

const resolvePromise = (promise2, x, resolve, reject) => {
    let isCalled = false
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }

    // 为了能兼容其他符合 PromiseA+标准的promise 如: bluebird q es6-promise
    if (x instanceof Promise) { // 对应标准2.3.2
        if (x.status === PENDING) {
            x.then(value => {
                resolvePromise(promise2, value, resolve, reject);
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }
    if (((typeof x === 'obejct') && (x !== null)) || (typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (isCalled) return;
                    isCalled = true;
                    // 实现递归解析
                    resolvePromise(promise2, y, resolve, reject);
                },e => {
                    if (isCalled) return;
                    isCalled = true;
                    reject(e);
                });
            } else {
                resolve(x);
            }
        } catch(ex) {
            if (isCalled) return;
            isCalled = true;
            reject(ex);
        }
    } else {
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        // 发布订阅模式
        this.doneCallbacks = []
        this.failCallbacks = []
        let resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject); // 递归解析resolve中的参数 直到不是promise对象
            }

            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                this.doneCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.failCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject);
        } catch(ex) {
            reject(ex);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val
        onRejected = typeof onRejected === 'function' ? onRejected: err=>{ throw err }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                let x = onFulfilled(this.value);
                setTimeout(() => {
                    try {
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (ex) {
                        reject(ex);
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                let x = onRejected(this.reason);
                setTimeout(() => {
                    try {
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (ex) {
                        reject(ex);
                    }
                }, 0)
            }
            if (this.status === PENDING) {
                this.doneCallbacks.push(() => { // 订阅 
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (ex) {
                            reject(ex);
                        }
                    }, 0);
                })
                this.failCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(ex) {
                            reject(ex);
                        }
                    }, 0);
                })
            }

        })
        return promise2;
    }
    catch(failCallback) {
        return this.then(null, failCallback);
    }
    static resolve(data) {
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    }
    static reject(data) {
        return new Promise((resolve, reject) => {
            reject(data)
        })
    }
    //finally 是无论如何都会执行的意思
    //如果返回一个promise，会等待这个promise也执行完毕
    finally(callback) {
        return this.then(
            x => Promise.resolve(callback()).then(() => x),
            e => Promise.reject(callback()).then(() => {throw e})
        )
    }

    all(promises) {
        let resolvedCount = 0;
        let promisesLen = promises.length;
        let results = new Array(promisesLen);
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promisesLen; i++) {
                (function(i) {
                    Promise.resolve(val).then(value => {
                        resolvedCount++;
                        results[i] = value;
                        // 当所有函数都正确执行了，resolve输出所有返回结果
                        if (resolvedCount === promisesLen) {
                            return resolve(results);
                        }
                    }, reason => reject(reason))
                })(i)
            }
            resolve(results);
        })
    }
}

Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = Promise