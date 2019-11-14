js获取网页和元素的宽度、高度

网页可见区域宽：document.body.clientWidth
网页可见区域高：document.body.clientHeight
网页可见区域宽：document.body.offsetWidth （包括边线和滚动条的宽）
网页可见区域高：document.body.offsetHeight（包括边线的宽）
网页正文全文宽：document.body.scrollWidth
网页正文全文高：document.body.scrollHeight
网页被卷去的高(ff)：document.body.scrollTop
网页被卷去的高(ie)：document.documentElement.scrollTop
网页被卷去的左：document.body.scrollLeft
网页正文部分上：window.screenTop
网页正文部分左：window.screenLeft
屏幕分辨率的高：window.screen.height
屏幕分辨率的宽：window.screen.width
屏幕可用工作区高度：window.screen.availHeight
屏幕可用工作区宽度：window.screen.availWidth
你的屏幕设置是：window.screen.colorDepth  位彩色
你的屏幕设置：window.screen.deviceXDPI  像素/英寸
window的页面可视部分实际高度(ff)：window.innerHeight

某个元素的宽度：obj.offsetWidth
某个元素的高度：obj.offsetHeight
某个元素的上边界到body最顶部的距离：obj.offsetTop（在元素的包含元素不含滚动条的情况下）
某个元素的左边界到body最左边的距离：obj.offsetLeft（在元素的包含元素不含滚动条的情况下）
返回当前元素的上边界到它的包含元素的上边界的偏移量：obj.offsetTop（在元素的包含元素含滚动条的情况下）
返回当前元素的左边界到它的包含元素的左边界的偏移量：obj.offsetLeft（在元素的包含元素含滚动条的情况下）

scrollTop, scrollLeft
设置或返回已经滚动到元素的左边界或上边界的像素数。只有在元素有滚动条的时候，例如，元素的 CSS overflow 属性设置为 auto 的时候，这些像素才有用。这些属性也只在文档的 <body> 或 <html> 标记上定义（这和浏览器有关），并且一起来制定滚动文档的位置。注意，这些属性并不会指定一个 <iframe> 标记的滚动量。这是非标准的但却得到很好支持的属性




在我本地测试当中：
在IE、FireFox、Opera下都可以使用
document.body.clientWidth
document.body.clientHeight
即可获得，很简单，很方便。
而在公司项目当中：
Opera仍然使用
document.body.clientWidth
document.body.clientHeight
可是IE和FireFox则使用
document.documentElement.clientWidth
document.documentElement.clientHeight
原来是W3C的标准在作怪啊
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
如果在页面中添加这行标记的话

在IE中：
document.body.clientWidth ==> BODY对象宽度
document.body.clientHeight ==> BODY对象高度
document.documentElement.clientWidth ==> 可见区域宽度
document.documentElement.clientHeight ==> 可见区域高度
在FireFox中：
document.body.clientWidth ==> BODY对象宽度
document.body.clientHeight ==> BODY对象高度
document.documentElement.clientWidth ==> 可见区域宽度
document.documentElement.clientHeight ==> 可见区域高度
?
在Opera中：
document.body.clientWidth ==> 可见区域宽度
document.body.clientHeight ==> 可见区域高度
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）
document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高）
而如果没有定义W3C的标准，则
IE为：
document.documentElement.clientWidth ==> 0
document.documentElement.clientHeight ==> 0
FireFox为：
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）
document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高）
Opera为：
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）
document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高）
真是一件麻烦事情，其实就开发来看，宁可少一些对象和方法，不使用最新的标准要方便许多啊。

有时候需要取页面的底部, 就会用到document.body.clientHeight , 在HTML 标准中(这一句就能取到整个页面的高度, 不论body 的实际内容到底有多高, 例如, 1074*768 的分辨率, 页面最大化时, 这个高度约为720 , 即使页面上只有一句”hello world” , 也仍然取到720.

可是在XHTML中, 如果body 体中只有一行, 则document.body.clientHeight 只能取到那一行的高度, 约20px, 这时如何还想取到整个页面的高度, 就要用document.documentElement.clientHeight 来获取了.

原因是: 在HTML 中, body 是整个DOM 的根, 而在XHTML 中, document 才是根, body 不再是根, 所以取body 的属性时, 不能再取到整个页面的值.

区别新旧标准的行是:
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
前者指明该页面使用旧标准, 后者指明该页面使用新标准.

总结:
XHTML中用 document.documentElement.clientHeight 代替
document.body.clientHeight