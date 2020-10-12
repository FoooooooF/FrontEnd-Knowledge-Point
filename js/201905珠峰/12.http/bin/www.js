#! /usr/bin/env node

// 获取用户的工作目录
// yargs(webpack) commander(tj)

const program = require("commander");

program
  .option("-p, --port <type>", "set port")
  .option("-c, --cwd <type>", "set directory");
let opts = program.parse(process.argv);

let Server = require("../static-server.js");
let server = new Server({
  port: 3000,
  cwd: process.cwd(),
  ...opts
});
server.start(); // 启动服务

// 文件夹 发包 缓存 gzip
// 其他的header的用法 多语言 防盗链代理koa 跨域
