const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const uuid = require('uuid'); // 不会重复的名字
Buffer.prototype.split = function(sep){
    let len = Buffer.from(sep).length
    let offset = 0;
    let current;
    let arr = [];
    while(-1!==(current = this.indexOf(sep,offset))){
        arr.push(this.slice(offset,current));
        offset = current + len;
    }
    arr.push(this.slice(offset));
    return arr;
}
http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url);
    console.log(pathname,req.method)
    if (pathname === "/upload" && req.method === "POST") {
        console.log(req.headers["content-type"])
      if (req.headers["content-type"].includes("multipart/form-data")) {

        let boundary = '--'+req.headers["content-type"].split('=')[1];
        // 上传文件
        const arr = [];
        req.on("data", function(chunk) {
          arr.push(chunk);
        });
        req.on("end",function(){
            const content = Buffer.concat(arr); // 二进制数据
            let lines = content.split(boundary).slice(1,-1);
            let obj = {};
            lines.forEach(line=>{
                let [h,body] = line.split('\r\n\r\n');
                head = h.toString();
                let key = head.match(/name="([\s\S]+?)"/)[1]; // 获取到的字段名
                if(head.includes('filename')){
                    // 要拿到文件的内容 将文件写入到服务器上
                     // 整个当前字段的长度
                     // 当前头部的长度
                    let buffer = line.slice(h.length + 4); // 内容开始的部分
                    let filename = uuid.v4();
                    let filePath = path.resolve(__dirname,'./upload',filename);
                    fs.writeFileSync(filePath,buffer); // 上传到服务器
                    let statObj = fs.statSync(filePath);
                    let arr = obj[key] || (obj[key] = [])
                    arr.push({
                        filename, // 上传的文件名
                        filePath,
                        size:statObj.size
                    });
                }else{
                    body = body.toString();
                    obj[key] = body.slice(0,-2); // 普通的文本我就处理好了
                };
            })
            res.end(JSON.stringify(obj));
        })
      }
      return;
    }

    // ------------
    let filePath = path.join(__dirname, pathname);
    fs.stat(filePath, function(err, statObj) {
      if (err) {
        res.statusCode = 404;
        res.end();
        return;
      }
      if (statObj.isFile()) {
        fs.createReadStream(filePath).pipe(res);
        return;
      } else {
        res.statusCode = 404;
        res.end();
        return;
      }
    });
  })
  .listen(3000);

// 表单是不存在跨域的问题
// 表单格式
// content-type:application/www-x-form-urlencoded
// content-type:application/json
// 文件上传的
// content-type:multipart/form-data (表单) formData
// 分片上传 断点续传
