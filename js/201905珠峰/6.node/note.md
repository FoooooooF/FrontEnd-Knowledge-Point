## 进程和线程
- 任务管理器 进程 管理的最小的单位就是进程
- 进程是包含线程的 node js语法 主线程单线程的 基于v8
- js组成部分 BOM DOM ECMAScript  node(ECMAScript) + 内置有个 libuv库 fs http path ....
- node可以提供一个高性能的web开发服务
- 开发工具webpack  解决中间层的问题(解决跨域) 服务端渲染(首页白屏 seo优化 spa mpa)  纯后端  react + vue js写的 node支持node  node链接mongo redis mysql

## 稳定性
- 用node来做服务 可以开启多个进程 子进程 进程之间的通信
- pm2
- 一个cpu 开启一个进程 

## 单线程和多线程的区别
- java  对文件的i/o 操作并不合适 适合cpu密集性 计算 压缩 文件的处理
- node适合 i/o操作 异步的i/o  通过事件来驱动
- node中为了实现异步的i/o 通过了多线程模拟了异步

> 多线程 锁的 node中没有
> 多线程 时间片切换 有时间的消耗


## 同步和异步 、  阻塞非阻塞
- 被调用者来决定同步和异步 fs.readFileSync
- 调用者的状态  阻塞非阻塞

## node
- v11.14.0
- node全局变量
- 进程通信 