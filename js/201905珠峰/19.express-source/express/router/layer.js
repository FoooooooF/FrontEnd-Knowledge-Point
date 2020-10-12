const pathToRegExp = require('path-to-regexp');
function Layer(path,handler){
    this.path = path;
    this.handler = handler;
    // 把路径转化成正则 :id/:name => [{name:id},{name:name}]
    this.regExp = pathToRegExp(this.path,this.keys=[]);
}
// 判断当前层有没有和请求的路径匹配到
Layer.prototype.match = function(pathname){
    // 如果路径相等就是匹配到了
    if(this.regExp.test(pathname)){
        // 已经匹配到路径了
        let matches = pathname.match(this.regExp);
        this.params = this.keys.reduce((memo,current,index)=>(
            memo[current.name] = matches[index+1],memo
        ),{});
        return true;
    }
    if(this.path === pathname){
        return true;
    }
    // 如果是中间件 路径是 / 匹配到了
    if(!this.route){ // 中间件
        if(this.path === '/'){
            return true;
        }
        return pathname.startsWith(this.path+'/');
    }
    return this.path === pathname;
}


module.exports = Layer