const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const { createReadStream } = require("fs");
const mime = require("mime");
const chalk = require("chalk");
class Server {
  constructor(config) {
    this.port = config.port || 3000;
    this.cwd = config.cwd || process.cwd();
  }
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url);
    let filepath = path.join(this.cwd, pathname);
    try {
      let statObj = await fs.stat(filepath);
      if (statObj.isDirectory()) {
        filepath = path.join(filepath, "index.html");
        await fs.access(filepath);
      }
      this.sendFile(req, res, filepath);
    } catch (e) {
      this.sendError(req, res, e);
    }
  }
  sendFile(req, res, filepath) {
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
// http
//   .createServer((req, res) => {
//     // /static/1.html
//     let { pathname, query } = url.parse(req.url, true);
//     let absPath = path.join(__dirname, pathname);
//     fs.stat(absPath, (err, statObj) => {
//       // 静态文件的处理
//       if (err) {
//         res.statusCode = 404;
//         return res.end();
//       }
//       if (!statObj.isFile()) {
//         // 如果是文件夹 需要找文件夹中的index.html
//         absPath = path.join(absPath, "index.html");
//         fs.access(absPath, function(err) {
//           if (err) {
//             res.statusCode = 404;
//             return res.end();
//           }
//         });
//       }
//       res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
//       fs.createReadStream(absPath).pipe(res);
//     });
//   })
//   .listen(3000);
