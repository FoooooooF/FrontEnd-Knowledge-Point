let response = {
    _body:'', // _ 意味着不希望别人访问到私有属性
    get body(){
        return this._body
    },
    set body(value){
        this.res.statusCode = 200; // 如果你调用了ctx.body = 'xxx'
        this._body = value;
    }
}


module.exports = response;