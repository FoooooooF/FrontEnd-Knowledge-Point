// Object.defineProperty get / set
// 不能监听数组的变化 push shift

// proxy 兼容性

// 支出数组和对象
let obj = {
  // 如果对象上不存在某个属性
  name: "zf",
  age: {
    n: 1
  }
};
let arr = [];
let handler = {
  // defineProperty :{}
  get(target, key) {
      if(typeof target[key] === 'object'){
          return new Proxy(target[key],handler)
      }
    // Reflect keys
    // return Reflect.get(target, key);
    return target[key]
  },
  set(target, key, value) {
    if (key === "length") return true;
     target[key] = value;
     console.log('update');
    return Reflect.set(target, key, value);
  }
};
let proxy = new Proxy(obj, handler);
// vue 时候 必须保证先声明在使用 vm.$set()
// proxy.push('123');
proxy.age = {}
console.log(obj);


