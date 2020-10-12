// 靠同步的方式 
// webpack(读取文件)
let fs = require('fs');
let path = require('path');
let vm = require('vm');
function Module(id){
    this.id = id;
    this.exports = {}
}
Module._cache = {};
Module._extensions = {
    '.js'(){},
    '.json'(module){
        let content = fs.readFileSync(module.id,'utf8');
        content = JSON.parse(content);
        module.exports = content;
    }
}
Module.prototype.load  = function(){
    let ext = path.extname(this.id); // 要加载的文件
    Module._extensions[ext](this);
}

// .js .json文件
function myrequire(filePath){
    let absPath = path.resolve(__dirname,filePath);
    let p = '';
    try{
        // 判断当前路径是否存在
        fs.accessSync(absPath)
        p = absPath;
    }catch(e){
        // 增加逻辑 看是否存在
        let extensions = Object.keys(Module._extensions);
        extensions.some(ext=>{
          let url = absPath + ext;
          try{
            fs.accessSync(url);p = url;
            return true;
          }catch(e){
            return false;
          }
        });
    }
    if(p){
        // 单例模式
        if( Module._cache[p]){ // 如果缓存中有直接将缓存中的exports属性返回回去即可
            return  Module._cache[p].exports; 
        }
        let module = new Module(p); // 创建一个模块对象
        Module._cache[p] = module
        // 加载模块
        module.load(); // 加载这个模块
        return module.exports; // 只需要返回module.exports 属性
    }else{
        throw new Error('file not access')
    }
}
let json = myrequire('./1.json');
json = myrequire('./1.json');
console.log(json);


// 模块的机制