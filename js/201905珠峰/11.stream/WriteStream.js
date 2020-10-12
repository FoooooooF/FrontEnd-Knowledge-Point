let EventEmitter = require('events');
let fs = require('fs');
class WriteStream extends EventEmitter{
    constructor(path,options = {}){
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.mode = options.mode || 0o666;
        this.encoding = options.encoding || 'utf8';
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark||16*1024;
        this.autoClose =  options.autoClose || true;

        this.cache = []; // 缓存区
        this.writing = false; // 默认不是正在写入
        this.needDrain = false;// 只有写入的内容大于等于highWaterMark needDrain = true
        this.pos = this.start; // 写入的偏移量
        this.len = 0; // 写入的总个数 每次调用wirte 我就讲内容的个数累加到len属性上，每次写入后在将len的值减少即可

        this.open();
    }
    write(chunk,encoding=this.encoding,callback){
        chunk = Buffer.isBuffer(chunk)?chunk : Buffer.from(chunk); // chunk就是buffer类型
        this.len += chunk.length;
        // 判断写入的内容是否超过水位线
        let ret = this.highWaterMark > this.len;
        this.needDrain = !ret;
        if(this.writing){
            this.cache.push({
                chunk,
                encoding,
                callback
            });
        }else{
            this.writing = true; // 正在写入
            this._write(chunk,encoding,callback);// 真正的写入逻辑
        }
        return ret;
    }
    clearBuffer(){
        let obj = this.cache.shift();
        if(!obj){
            if(this.needDrain){
                this.writing = false;
                this.needDrain = false;
                this.emit('drain');
            }
        }else{
            this._write(obj.chunk,obj.encoding,obj.callback);
        }
    }
    _write(chunk,encoding,callback){
         if(typeof this.fd !== 'number'){
             return this.once('open',()=>this._write(chunk,encoding,callback))
         }
         fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,written)=>{
            this.pos += written
            this.len -= written;// 较少缓存区的数量
            callback && callback(); // 调用写入成功的回调
            // 清空缓存区
            this.clearBuffer();// 清空缓存区
         });
    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err){
                return this.emit('error');
            }
            this.fd = fd;
            this.emit('open',fd)
        });
    }
}

module.exports = WriteStream