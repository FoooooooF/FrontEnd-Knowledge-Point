const http = require('http');
const url = require('url');
const Router = require('./router');
const fs = require('fs');
const path = require('path');
const methods = require('methods'); // 第三方的模块
function Application(){ // 提供一个创建应用的类
    // 路由和应用的分离 
    // this.routes = [
    //     {path:'*',method:'*',handler(req,res){
    //         res.end(`Cannot ${req.method} ${req.url}`)
    //     }}
    // ];
    this.settings = {
        'views':'views',
        'view engine':'html'
    };
    this.engines = {
        '.ejs':require('ejs').__express
    }; // 内部的参数设置
}
Application.prototype.engine = function(ext,renderFn){
    this.engines[ext] = renderFn;
}
// 设置属性 设置和获取 都合并到一个函数中
Application.prototype.set = function(key,value){
    if(arguments.length === 1){
        return this.settings[key];
    }
    this.settings[key] = value
}
// 路由系统的懒加载
Application.prototype.lazy_route = function(){
    if(!this.router){
        this.router = new Router();
        // 当前路由创建完毕后 就初始化内置的中间件
        this._init();
    }
}
Application.prototype._init = function(){

    this.use((req,res,next)=>{ // 源码里自己实现了send方法
        req.path = url.parse(req.url,true).pathname;
        req.query = url.parse(req.url,true).query
        res.send = function(value){
            if(typeof value === 'string' ||Buffer.isBuffer(value)){
                res.end(value);
            }else if(typeof value==='object'){
                res.end(JSON.stringify(value))
            }
        }
        res.render = (filename,obj = {})=>{
            let extension = this.get('view engine');
            let dir = this.get('views'); //获取文件夹路径
            // 查找扩展名
            extension = extension.includes('.')?extension:'.'+extension;
            // resolve 不增加__dirname 默认是找当前执行的目录
            let filepath = path.resolve(dir,filename+extension)
            // 找到对应的模板的渲染函数
            let renderFn = this.engines[extension]
            renderFn(filepath,obj,function(err,html){
                // 渲染结果后将内容返回
                res.end(html);
            });
        }
        res.sendFile = (absPath)=>{
            fs.createReadStream(absPath).pipe(res);
        }
        next();
    })
}
Application.prototype.param = function(key,handler){
    this.lazy_route();
    this.router.param(key,handler);
}
Application.prototype.use = function(path,handler){
    this.lazy_route(); // 确保路由已经产生了
    // 交给路由来处理中间件的逻辑 
    this.router.use(path,handler);
}
methods.forEach(method=>{
    Application.prototype[method] = function(path,...handler){
        // 如果是get方法 并且参数只有一个 就回到set方法把参数传回去
        if(method === 'get' && arguments.length == 1){
            return this.set(path);
        }
        this.lazy_route();
        // 自己不再处理放置路由的逻辑 交给路由自己去管理
        this.router[method](path,handler)
        // this.router.push({
        //     path,
        //     method:'get',
        //     handler
        // });
    }
})

Application.prototype.listen = function(){
    this.lazy_route();
    http.createServer((req,res)=>{
        // 需要将req，res交给路由来处理 
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this.router.handler(req,res,done);


        // let {pathname} = url.parse(req.url);
        // let method = req.method.toLowerCase();
        // for(let i = 1;i<this.routes.length;i++){
        //     let {path,method:m,handler} = this.routes[i];
        //     if(pathname === path && method === m){
        //        return handler(req,res); // 调用匹配到的handler 传入req和res
        //     }
        // }
        // this.routes[0].handler(req,res);
    }).listen(...arguments)
}
module.exports = Application
