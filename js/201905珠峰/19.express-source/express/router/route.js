const Layer = require("./layer");
const methods = require('methods');
function Route() {
  this.stack = [];
  this.methods = {}; // 为了实现匹配方法的时候可以尽量少匹配
}
Route.prototype.match = function(method){
  return this.methods[method.toLowerCase()]
}
methods.forEach(method=>{
  Route.prototype[method] = function(handlers) {
    handlers.forEach(handler => {
      let layer = new Layer("/", handler); // 方便扩展
      layer.method = method;
      this.methods[method] = true;
      this.stack.push(layer);
    });
  };
})

Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  let next = (err) => {
    if(err) return out(err)
    if (idx >= this.stack.length) return out(); // 内部执行后 会从内部出去到外层
    let layer = this.stack[idx++];
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req,res,next); // 执行对应方法
    } else {
      next();
    }
  };
  next();
};
module.exports = Route;
