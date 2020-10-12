const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const { readFileSync,createReadStream } = require("fs");
const mime = require("mime");
const chalk = require("chalk");
const zlib = require('zlib');
const ejs = require('ejs'); // 模板引擎 
const template = readFileSync(path.resolve(__dirname,'template.html'),'utf8');
class Server {
  constructor(config) {
    this.port = config.port || 3000;
    this.cwd = config.cwd || process.cwd();
    this.template = template;
  }
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url);
    pathname = decodeURIComponent(pathname); // 处理中文
    let filepath = path.join(this.cwd, pathname);
    try {
      let statObj = await fs.stat(filepath);
      if (statObj.isDirectory()) {
        // 展示目录中的内容 读取目录中的解构
        let dirs = await fs.readdir(filepath);
        let str = ejs.render(this.template,{
          arr:dirs,
          // 如果路径是/ 那就不需要增加路径
          currentPath:pathname === '/'?'':pathname
        });
        res.setHeader("Content-Type","text/html;charset=utf-8");
        res.end(str);
      }
      this.sendFile(req, res, filepath,statObj);
    } catch (e) {
      this.sendError(req, res, e);
    }
  }
  cache(req,res,statObj){// 返回boolean
      //浏览器 if-none-match if-modfied-since
      let ifNoneMatch = req.headers['if-none-match']; // 就先采用文件大小
      let ifModifiedSince = req.headers['if-modified-since'];
      let currentEtag = "abc"+statObj.size;
      let currentLastModified = statObj.ctime.toGMTString();
      res.setHeader('Etag',currentEtag);
      res.setHeader('Last-Modified',currentLastModified);
      if(ifNoneMatch !== currentEtag){
        return false
      }
      if(ifModifiedSince!== currentLastModified){
        return false
      }
      return true;
  } 
  gzip(req,res,statObj){ // 实现gzip压缩
    let encoding = req.headers['accept-encoding']
    if(encoding){
      // 支持压缩
      if(encoding.match(/gzip/)){
        res.setHeader('Content-Encoding','gzip')
        return zlib.createGzip()
      }else if(encoding.match(/deflate/)){
        res.setHeader('Content-Encoding','deflate');
        return zlib.createDeflate();
      }
    }
    return false
  }
  sendFile(req, res, filepath,statObj) {
    console.log(req.url);
    // 先做强制缓存
    // 做缓存，如果文件没变 直接去浏览器缓存找就ok了
    res.setHeader('Cache-Control','max-age=10');
    res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString())
    // 专门写个方法
    if(this.cache(req,res,statObj)){
      res.statusCode = 304;
      return res.end();
    }
    // 返回文件之前 需要做压缩操作 ,如果能压缩 就返回一个转换流
    let gzip;
    if(gzip = this.gzip(req,res,statObj)){
      res.setHeader("Content-Type", mime.getType(filepath) + ";charset=utf-8");
      createReadStream(filepath).pipe(gzip).pipe(res);
      return
    }
    res.setHeader("Content-Type", mime.getType(filepath) + ";charset=utf-8");
    createReadStream(filepath).pipe(res);
  }
  sendError(req, res, err) {
    console.log(err);
    res.statusCode = 404;
    res.end("Not Found");
  }
  start() {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(`${chalk.yellow("Starting up http-server, serving ./")}
  Available on:
  http://127.0.0.1:${chalk.green(this.port)}
Hit CTRL-C to stop the server
    `);
    });
  }
}
module.exports = Server;

// 304 http缓存的 服务端设置
// 强制缓存  对比缓存