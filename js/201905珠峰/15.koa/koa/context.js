let context = {};

// context指的并不是默认的ctx this.context = Object.create(context);
// ctx.path = ctx.request.path
// context 代理
function defineGetter(property, key) {
  context.__defineGetter__(key, function() { // getter
    return this[property][key];
  });
}
function defineSetter(property,key){
  context.__defineSetter__(key,function(value){ // setter
    this[property][key] =value;
  })
}


defineGetter("request", "path");
defineGetter("request", "url");
defineGetter("response", "body"); // ctx.body = ctx.response.body
defineSetter('response',"body");
// ctx.body = '123' ctx.response.body = 123;
module.exports = context;

// let o = {};
// o.__defineGetter__('get5',function(){
//     return 100;
// })
// console.log(o.get5)



