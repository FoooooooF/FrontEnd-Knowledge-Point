const http = require("http");
// 中间层 不会跨域 浏览器
// http.get()
let client = http.request(
  // 爬取页面dom元素
  {
    // req
    hostname: "localhost",
    port: 3000,
    headers: {
      a: 1,
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Content-Type": "application/json",
      "Content-Type": "text/plain"
    },
    method: "post"
  },
  function(res) {
    res.on("data", function(chunk) {
      console.log(chunk.toString());
    });
  }
);
// 写入一些内容
let r = encodeURIComponent(`你`);
client.write(r); // 为了能发送请求体
client.end();

// 客户端和服务端之间的通信
