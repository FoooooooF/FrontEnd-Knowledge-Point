const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime"); // .html => text/html
http
  .createServer((req, res) => {
    // /static/1.html
    let { pathname, query } = url.parse(req.url, true);
    let absPath = path.join(__dirname, pathname);
    fs.stat(absPath, (err, statObj) => {
      // 静态文件的处理
      if (err) {
        res.statusCode = 404;
        return res.end();
      }
      if (!statObj.isFile()) {
        // 如果是文件夹 需要找文件夹中的index.html
        absPath = path.join(absPath, "index.html");
        fs.access(absPath, function(err) {
          if (err) {
            res.statusCode = 404;
            return res.end();
          } else {
            res.setHeader(
              "Content-Type",
              mime.getType(absPath) + ";charset=utf-8"
            );
            fs.createReadStream(absPath).pipe(res);
          }
        });
      } else {
        res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
        fs.createReadStream(absPath).pipe(res);
      }
    });
  })
  .listen(3000);
