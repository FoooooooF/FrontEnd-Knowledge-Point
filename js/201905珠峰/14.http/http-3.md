### review

### 1.在浏览器*地址*栏*输入URL*,按下回车后究竟发生了什么?

1). 浏览器通过DNS将url地址解析为ip (如果有缓存直接返回缓存,否则递归解析)  

2).通过DNS解析得到了目标服务器的IP地址后，与服务器建立TCP连接。

	- ip协议： 选择传输路线,负责找到
	- tcp协议： 三次握手，分片，可靠传输，重新发送的机制

3).浏览器通过http协议发送请求 (增加http的报文信息) 头 体 行

4).服务器接受请求后，查库，读文件，拼接好返回的http响应 

5).浏览器收到html，开始渲染

6).解析html为dom，解析css为css-tree,最终生成render-tree 阻塞渲染

7).遍历渲染树开始布局，计算每个节点的位置大小信息

8).将渲染树每个节点绘制到屏幕

9).加载js文件,运行js脚本

10).reflow (样式)与repaint(位置)



![domrender](http://img.zhufengpeixun.cn/domrender.jpg)

### 2.页面的性能优化

![img](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562322737439&di=6940a8a49d168d9690f3732794b01a4e&imgtype=0&src=http%3A%2F%2Fimg2018.cnblogs.com%2Fblog%2F1555757%2F201812%2F1555757-20181210173358459-380857182.png)

### 3.常见的优化

- 缓存

  HTTP中缓存 强制缓存和对比缓存的应用(304)  memory  disk

  service worker 和 cache api (离线缓存   HTTPS)  pwa

  Push Cache 推送缓存 HTTP/2中的内容

  ```javascript
  Cache-Control / Expires
  If-modified-since / Last-modified
  Etag / if-none-match
  ```



- 压缩

  gzip 压缩，找重复出现的字符串，临时替换，让整个文件变小，重复率越高压缩率越高 zlib模块

  ```
  accept-encoding:gzip
  ```

  

- 本地存储

  localStorage,sessionStorage,session,cookie,indexDB,cacheApi

  1) cookie 不支持跨域 合理使用cookie否则会导致流量浪费  domain  p

  2) localStorage / sessionStorage 不会发送给服务器

  3) IndexDB 浏览器中的非关系型数据库

   [http://www.ruanyifeng.com/blog/2018/07/indexeddb.html](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)

  4) cacheApi 离线缓存

  

- CDN

  内容分发网络 负载均衡 就近返回内容

  

- defer & async ／ preload & prefetch

  - defer 和 async 在网络读取的过程中都是异步解析

  - defer是有顺序依赖的，async只要脚本加载完后就会执行

  - preload 可以对当前页面所需的脚本、样式等资源进行预加载

  - prefetch 加载的资源一般不是用于当前页面的，是未来很可能用到的这样一些资源



### 4.HTTP状态码

1xx 信息性状态码  websocket upgrade

2xx 成功状态码  200 204(没有响应体) 206(范围请求 暂停继续下载)

3xx 重定向状态码 301 302 303  304 307  

4xx 客户端错误状态码 400 401 403 404 405

5xx 服务端错误状态码 500 503



### 5. HTTP服务创建

- url模块的使用

  ```
  let {pathname,query} = url.parse(str,true);
  ```

  

- 创建服务接受请求

  ```
  let server = http.createServer(()=>{});
  server.on('request');
  server.listen();
  server.on('error');
  
  req.method // 请求方法
  req.url // 请求路径
  req.headers // 请求头
  
  req.on('data') // 获取相应体 
  req.on('end')
  
  // -------------------------
  res.statusCode // 响应状态码
  res.setHeader() // 设置响应头
  res.write() // 写响应体
  res.end() // 结束响应体
  ```

- 客户端发送请求

  ```
  http.request()
  http.get()
  ```

  

### 6.Http Header应用

内容类型: 请求体解析/文件上传

```
content-type:multipart/form-data
content-type:application/x-www-form-urlencoded
content-type:application/json
```

语言类型: 多语言

```
accept-language:zh-CN,zh;q=0.9,en;q=0.8
```

来源header: 防盗链

```
referer / referrer
```

用户内核：跳转不同网站

```
user-agent
```

host主机: 反向代理

```
host:a.zhufeng.cn:81
```





























































































































