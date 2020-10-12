let url = require('url')
let request = {
    get url(){ // 属性访问器 Object.defineProperty
        return this.req.url
    },
    get path(){
        return url.parse(this.req.url).pathname
    }
     // req.url
}
module.exports = request