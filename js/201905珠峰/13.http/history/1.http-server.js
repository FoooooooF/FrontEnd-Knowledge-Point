const http = require("http");
const url = require("url");

// let obj = url.parse("http://jw:12354@www.baidu.com:8000/a?a=1&b=2#app", true);

// 服务器要求必须监听端口和ip地址
const server = http.createServer();
server.on("request", (req, res) => {
  // req 是一个可读流 on('data')
  // res 是一个可写流 write end
  const method = req.method; // 请求的方法 大写的
  // 路由 根据不同的路径返回不同的内容  路径 查询参数
  const { pathname, query } = url.parse(req.url, true); // 请求路径 完整的路径 3000 之后 到# 之前
  const version = req.httpVersion;
  console.log(method, url, version, pathname, query);
  // ----- 以上请求行信息 ---------
  console.log(req.headers); // 所有的请求头的key都是小写的
  // 发送的是post 请求请求体
  let arr = [];
  req.on("data", function(data) {
    // 读取请求体中的数据
    arr.push(data);
  });
  req.on("end", function() {
    console.log(Buffer.concat(arr).toString());
  });
  // ----- 响应相关的 ------
  res.statusCode = 404; // 状态码
  res.setHeader("a", 1); // 设置响应头
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.write("hello"); // 设置响应体
  res.end("你好"); // end 不调用 请求不结束
});
let port = 8080;
server.listen(port, () => {
  console.log("server start" + port);
});
server.on("error", err => {
  // 重新启动端口
  if (err.code === "EADDRINUSE") {
    server.listen(++port);
  }
});
// 如果端口好占用 + 1

// nodemon 文件变化可以重启node服务
// sudo npm install nodemon -g
//nodemon 1.http-server.js
