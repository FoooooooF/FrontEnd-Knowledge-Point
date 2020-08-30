## 封装一个原生的ajax请求

### 简单请求 /非简单请求
https://zhuanlan.zhihu.com/p/53545472
非简单请求预检请求

这里涉及到的简单请求和非简单请求的概念，那么简单请求和非简单请求有什么区别呢？MDN 对非简单请求进行了定义，满足下列条件之一，即为非简单请求：

使用了下列 HTTP 方法：PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH
使用了除以下首部之外的其他首部：Accept、Accept-Language、Content-Language、Content-Type
Content-Type首部的值不属于下列其中一个： application/x-www-form-urlencoded、 multipart/form-data、 text/plain
请求中的 XMLHttpRequestUpload 对象注册了任意多个事件监听器
请求中使用了ReadableStream对象
简单来说，除了我们平时使用最多的 GET 和 POST 方法，以及最常使用的 Accept、Accept-Language、Content-Language 和 类型为 application/x-www-form-urlencoded、 multipart/form-data、 text/plain 的 Content-Type 请求头，其他基本都是非简单请求。对于这些非简单请求，浏览器会发出两个请求，第一个为 OPTIONS 遇见请求，遇见请求的响应检查通过后才会发出对资源的请求。
### 实现一个ajax
https://www.jianshu.com/p/918c63045bc3