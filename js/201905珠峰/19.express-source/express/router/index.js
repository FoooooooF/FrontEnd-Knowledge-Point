// 路由系统
let Route = require("./route");
let Layer = require("./layer");
let url = require("url");
const methods = require("methods");

function Router() { // let user = express.Router()
  let router = (req,res,next)=>{
    router.handler(req,res,next); // 处理这个新的路由系统，如果内部处理不了 ，在执行外层的中间件即可
  }
  router.stack = []; // 这个属性 需要放在router上
  Object.setPrototypeOf(router,proto)
  // router.__proto__ = proto; // 如果用户new这个类
  return router; // new Router
  // 类如果返还一个函数 那么实例就都指向了这个函数
}
// 因为等会会调用router上的方法
let proto = {};
proto.paramsCallback = {};
proto.param = function(key,handler){
  // 发布订阅 {id:[fn,fn],name:[fn]}
  (this.paramsCallback[key] || (this.paramsCallback[key]=[])).push(handler); // 订阅模式
}
proto.handle_param = function(layer,req,res,out){
  // 需要将订阅好的执行
  if(!layer.keys || layer.keys.length ==0){
    return out(); // 当前没有需要执行的param方法
  }
  let keys = layer.keys.map(item=>item.name);
  let idx = 0;
  let key;
  let callbacks;
  let param =()=>{ // [id,name]
    if(idx >= keys.length ) return out();
    key = keys[idx++];
    callbacks = this.paramsCallback[key];//id => [fn,fn]
    if(!callbacks){
      param()
    }else{
      execCallbck(); // 执行callback
    }
  }
  let i = 0;
  let execCallbck =()=>{
    let fn = callbacks[i++];
    if(fn){
      fn(req,res,execCallbck,layer.params[key],key)
    }else{
      i = 0;
      param();
    }
  }
  param(); // 4.15 express 模板引擎 内置的中间件
  // /user/:id/:name => keys=>[{name:id},{name:name}]
}
proto.route = function(path) {
  let route = new Route(); // 创建一个route
  // 创建一个Layer 路径 对应的dispatch方法
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};
proto.use = function(path, handler) {
  if (typeof handler == "undefined") {
    handler = path;
    path = "/";
  }
  let layer = new Layer(path, handler);
  layer.route = undefined; // 中间件没有route属性
  this.stack.push(layer);
};
methods.forEach(method => {
  proto[method] = function(path, handlers) {
    if(!Array.isArray(handlers)){ // 因为用户可能不是通过app来调用get方法，所以传递过来的handlers可能是一个函数
      handlers = [handlers]
    }
    // 创建一个层，把成放到stack中
    // 在创建一个route 里面专门存放handler
    // layer.route = route
    // 调用route方法 返回当前层对应的route的实例
    let route = this.route(path);
    route[method](handlers); // 把这个handler 存放到当前的route的stack中
  };
});

proto.handler = function(req, res, out) {
  // 请求到来会执行此方法
  // 先取出用户请求的路径
  let { pathname } = url.parse(req.url);
  let idx = 0;
  // 如果自己处理不了
  // 我需要看一下当前是不是路由 如果是路由需要匹配方法
  let removed;
  let next = err => {
    if(removed && removed.length){
      req.url = removed + req.url;
      removed = '';
    }
    if (idx >= this.stack.length) return out();
    let layer = this.stack[idx++]; // 在栈中拿到第一层
    // 无论是中间件 还是路由 都统一在最外层的路由系统中处理错误
    if (err) {
      // 如果有错误 就找中间件
      if (!layer.route) {
        // 如果找到了错误处理就让错误中间件执行即可
        if (layer.handler.length === 4) {
          layer.handler(err, req, res, next);
        }else{
          next(err);
        }
      } else {
        // 是路由继续向下找
        next(err);
      }
    } else {
      if (layer.match(pathname)) {
        // 中间件和路由的区别就是看是否匹配到了方法
        if (!layer.route) {
          // 如果是中间件 如果是错误处理中间件 默认正常情况下是不执行的
          if (layer.handler.length === 4) return next();
          // 普通中间件要执行的时候 需要删除签前面写的路径
          if(layer.path !== '/'){
            removed = layer.path;
            req.url = req.url.slice(removed.length)
          }
          layer.handler(req, res, next);
        } else {
          // 路由
          if (layer.route.match(req.method)) {
            req.params = layer.params;
            // 如果是路由就执行(在执行之前需要将订阅的内容 进行执行)
            proto.handle_param(layer,req,res,()=>{// out方法
              layer.handler(req, res, next);
            })
          } else {
            next();
          }
        }
      }else{
        next();
      }
    }

    // if (layer.match(pathname) && layer.route.match(req.method)) {
    //   // 如果路径相同, 将下一个layer逻辑 就是next方法传递进去
    //   layer.handler(req, res, next); // 执行当前layer上的route的dispatch方法
    // } else {
    //   next();
    // }
  };
  next();
};
module.exports = Router;
