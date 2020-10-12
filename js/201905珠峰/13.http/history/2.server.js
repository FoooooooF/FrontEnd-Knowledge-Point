const http = require("http");
const querystring = require("querystring");
http
  .createServer((req, res) => {
    let arr = [];
    req.on("data", function(chunk) {
      arr.push(chunk);
    });
    req.on("end", function() {
      let buffer = Buffer.concat(arr);
      let r;
      if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        // a=1; b=2 = {a:1,b:2} /([^=&]+)=([^=&]+)/
        r = querystring.parse(buffer.toString(), "&", "=").b;
      } else if (req.headers["content-type"] == "application/json") {
        r = JSON.parse(buffer.toString()).a;
      } else {
        r = buffer.toString();
        console.log(decodeURIComponent(r));
      }
      res.setHeader("Content-Type", "text/plain;charset=utf-8");
      res.end(r + "");
    });
  })
  .listen(3000);
