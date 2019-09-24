# iframe 的那些骚操作
HTML内联框架元素(`<iframe>`) 表示嵌套的browsing context。它能够将另一个HTML页面嵌入到当前页面中。
## 基本用法
- src
>嵌套页面的URL地址。使用遵守同源策略的  'about:blank' 来嵌套空白页。
- srcdoc HTML5 only
>该属性值可以是HTML代码，这些代码会被渲染到iframe中，如果同时指定了src属性，srcdoc会覆盖src所指向的页面。该属性最好能与sandbox和seamless属性一起使用。
- width
>以CSS像素格式HTML5，或以像素格式HTML 4.01，或以百分比格式指定frame的宽度。

## 骚操作
iframe原本的用法在现在看来是不合时宜的，问题太多了，不一一列举，但是它的其他功能却是不错的黑魔法，这里列举一些，想到了再更新：
1. 用来实现长连接，在websocket不可用的时候作为一种替代，最开始由google发明。Comet：基于 HTTP 长连接的“服务器推”技术
2. 跨域通信。JavaScript跨域总结与解决办法 ，类似的还有浏览器多页面通信，比如音乐播放器，用户如果打开了多个tab页，应该只有一个在播放。
3. 历史记录管理，解决ajax化网站响应浏览器前进后退按钮的方案，在html5的history api不可用时作为一种替代。
4. 纯前端的utf8和gbk编码互转。比如在utf8页面需要生成一个gbk的encodeURIComponent字符串，可以通过页面加载一个gbk的iframe，然后主页面与子页面通信的方式实现转换，这样就不用在页面上插入一个非常巨大的编码映射表文件了，其中子页面内容：
```html
<!doctype html>
<html>
  <head>
    <meta charset="gbk">
    <script>
      window.encoding = function(str){
        //利用a元素的href属性来encode
        var a = document.createElement("a");
        a.href = "/?q=" + str;
        var url = a.href; //这里读取的时候会自动编码
        a.href = "/?q=";
        return url.replace(a.href, "");
      };
    </script>
  </head>
</html>
```
把这个iframe部署到父页面的同源服务上，就能在父页面直接调用iframe中的encoding接口了。
5. 评论里有提到，用iframe实现无刷新文件上传，在FormData不可用时作为替代方案
6. 在移动端用于从网页调起客户端应用（此方法在iphone上并不安全，慎用！具体风险看这里  iOS URL Scheme 劫持 ）。比如想在网页中调起支付宝，我们可以创建一个iframe，src为：
```
alipayqr://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode={支付二维码扫描的url}
```
浏览器接收到这个url请求发现未知协议，会交给系统处理，系统就能调起支付宝客户端了。我们还能趁机检查一下用户是否安装客户端：给iframe设置一个3-5秒的css3的transition过渡动画，然后监听动画完成事件，如果用户安装了客户端，那么系统会调起，并将浏览器转入后台运行，进入后台的浏览器一般不会再执行css动画，这样，我们就能通过判断css动画执行的时长是否超过预设来判断用户是否安装某个客户端了：
```js
/**
 * 调起客户端
 * @param url {String}
 * @param onSuccess {Function}
 * @param onFail {Function}
 */
module.exports = function(url, onSuccess, onFail){
    // 记录起始时间
    var last = Date.now();

    // 创建一个iframe
    var ifr = document.createElement('IFRAME');
    ifr.src = url;
    // 飘出屏幕外
    ifr.style.position = 'absolute';
    ifr.style.left = '-1000px';
    ifr.style.top = '-1000px';
    ifr.style.width = '1px';
    ifr.style.height = '1px';
    // 设置一个4秒的动画用于检查客户端是否被调起
    ifr.style.webkitTransition = 'all 4s';
    document.body.appendChild(ifr);
    setTimeout(function(){
        // 监听动画完成时间
        ifr.addEventListener('webkitTransitionEnd', function(){
            document.body.removeChild(ifr);
            if(Date.now() - last < 6000){
                // 如果动画执行时间在预设范围内，就认为没有调起客户端
                if(typeof onFail === 'function'){
                    onFail();
                }
            } else if(typeof onSuccess === 'function') {
                // 动画执行超过预设范围，认为调起成功
                onSuccess();
            }
        }, false);
        // 启动动画
        ifr.style.left = '-10px';
    }, 0);
};
```
7. 创建一个全新的独立的宿主环境。经 @EtherDream 大神提醒，iframe还可以用于创建新的宿主环境，用于隔离或者访问原始接口及对象，比如有些前端安全的防范会覆盖一些原生的方法防止恶意调用，那我们就能通过创建一个iframe，然后从iframe中取回原始对象和方法来破解这种防范。类似的还有  @贺师俊 曾经提到的javascript裸对象创建中的一种方法：如何创建一个JavaScript裸对象 ，一般所见即所得编辑器也是由iframe创建的， @Dion 的回答有提到

8. IE6下用于遮罩select。经 @yaniv 提醒想起来的。曾经在ie6时代，想搞一个模态窗口，如果窗口叠加在select元素上面，是遮不住select的，为了解决这个问题，可以通过在模态窗口元素下面垫一个iframe来实现遮罩，好坑爹的ie6，还我青春韶华~~


# reference
1. [让动态的 iframe 内容高度自适应](https://www.cnblogs.com/imwtr/p/6050937.html)
2. [iframe 知乎](https://www.zhihu.com/question/20653055/answer/35387821)
3. [iframe MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)