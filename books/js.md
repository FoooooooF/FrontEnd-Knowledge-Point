此文是对js高级程序设计一书难点的总结，也是笔者在看了3遍之后的一些梳理和感想，希望能借此巩固js的基础和对一些核心概念有更深入的了解。

摘要

js基本的数据类型和关键点
变量，作用域和内存问题
垃圾回收机制
面向对象的程序设计
实现类与继承的经典方式
BOM和DOM对象
DOM扩展与高级API介绍
高级编程技巧
跨文档消息传递和ajax封装
web worker基本实现与demo
一. Number类型关键点讲解

1.进制问题

八进制字面量在严格模式下无效，会导致支持该模式的js引擎抛出异常
十六进制字面量的前两位必须是0x，后根任何十六进制数字（0-9及A-F）
在进行算术计算时，所有以八进制和十六进制表示的数值最终将被转换成十进制数值
2.浮点数注意点

浮点数值的最高精度是17位小数，但在进行算术计算时精度远远不如整数。例如 0.1 + 0.2 === 0.300000000000004(大致这个意思，具体多少个零请实际计算) 所以永远不要测试某个特定的浮点数值

3.数值

使用isFinite(num)来确定一个数字是否有穷
ECMAScript能够表示的最小值保存在变量 Number.MIN_VALUE 中，最大值保存在 Number.MAX_VALUE 中。
NaN表示非数值。在ECMAScript中，任何数值除以非数值会返回NaN,因此不会影响其他代码的执行。
isNaN()用来确定传入的参数是否为"非数值"。会对参数进行转化，不能被转化为数值的则返回true。
4.数值转换

parseFloat主要用于解析有效的浮点数字，始终会忽略前导的零，可识别所有的浮点数格式，但是十六进制格式的字符串始终会被转换成零。

二. 字符串

1. toString() 转换为字符串

let num = 10;
num.toString(n) n表示进制，可选，如2，8，10，16
三.循环

1. break和continue

break语句会立即退出循环，强制执行循环后面的语句
continue语句是退出当前循环，继续执行下一循环
// 结合label,更精确的控制循环
outerMost:
for(var i=0;i<10;i++){
    for(var j=0;i<10;j++){
        if(i = 5){
            break outerMost
        }
    }
}
//此时直接退出外部循环，continue也是类似
2. switch语句在比较值时使用的是全等操作符，所以不会发生类型转换

3. 函数参数arguments和命名参数

function add(n1, n2){
    arguments[1] = 10;
}
此时读取n2和arguments[1]并不会访问相同的内存空间，他们的内存空间是独立的，但他们的值保持同步

四.变量，作用域和内存问题

1.传递参数

1.所有的参数都是按值传递的。在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反应在函数外部

2.当在函数内部重写obj时，这个变量引用的就是一个局部对象。而这个局部对象会在函数执行完毕后立即被销毁。

2.垃圾收集

js最常用的垃圾收集机制为“标记清除”，另一种不常用的是“引用计数”。
原理：找出不再继续使用的变量，然后释放其内存空间。垃圾收集器会在固定的时间间隔周期性的执行这一操作。
3.管理内存

解除引用：数据不再有用，将其值设置为null

五.引用类型

1.数组总结

// 检测数值ES5方法
Array.isArray(value)  // 检测值是否为数组
// 转换方法
toString() 将数组转化为以逗号分隔的字符串
valueOf() 返回的还是数组
// 栈方法
push() 可以接收任意数量的参数，把他们逐个添加到数组的末尾，返回修改后数组的长度
pop() 从数组末尾移除最后一项，返回移除的项
// 队列方法
shift() 移除数组的第一项并返回该项
unshift() 向数组前端添加任意个项并返回新数组的长度
// 排序
sort(compare)
compare函数接收两个参数,如果返回负数，则第一个参数位于第二个参数前面；如果返回零，则两个参数相等；如果返回正数，第一个参数位于第二个参数后面
// 降序，升序相反
(a,b) => (b-a)
// 操作方法
concat(数组 | 一个或多个元素) // 合并数组，返回新数组
slice(起始位置 ，[结束位置]) // 切分数组，返回新数组，新数组不包含结束位置的项
splice(起始位置，删除的个数，[插入的元素]) // 删除|插入|替换数组，返回删除的元素组成的数组，会修改原数组
// 位置方法
indexOf(查找的项，[查找起点位置]) // 使用全等操作符，严格相等
lastIndexOf()
// 迭代方法，都接收两个参数，一个是要在每一项上运行的函数，一个是作用域（可选）
1.every 对数组中每一项运行给定函数，如果函数对每一项都返回true,则返回true
        every(fn(value,index,array){return ...},[this])
2.some 对数组中每一项运行给定函数，如果函数对任一项都返回true,则返回true
3.filter 对数组中每一项运行给定函数，返回该函数会返回true的项组成的数组
4.forEach 对数组每一项运行给定函数，无返回值
5.map 对数组每一项运行给定函数，返回每次函数调用返回结果组成的数组
// 归并方法 reduce和reduceRight(和前者遍历的方向相反),构建一个最终返回的值
reduce(fn(prev,cur,index,array){ return ... },initValue)
1.fn返回的值会作为第一个参数传递给下一项
2.initValue做为归并基础的初始值
2.Date对象

new Date(str | year,month,day,...) 可以接收日期格式的字符串，也可以是year, month, day参数的数字
Date.now() 返回调用这个方法的日期时间的毫秒数，使用 +new Date()也可以得到相同的效果
3.RegExp对象

由于RegExp构造函数的模式参数是字符串，所以在某些情况下要进行双重转义，对于\n双重转义为\\n
使用正则字面量时会共享一个RegExp实例，而正则构造函数会为每次调用创建一个新的regExp实例
RegExp实例属性
global / ignoreCase(忽略大小写)
lastIndex(表示开始搜索下一个匹配项的字符位置，从零开始)
source(正则表达式的字符串表示)
实例方法
.exec(text) text为要应用模式的字符串，返回包含第一个匹配项信息的数组。 返回值分析: 返回值是数组的实例，但包含两个额外的属性：index(表示匹配项在字符串中的位置)，input表示应用正则表达式的字符串
let text = "xd ff gggg";
let pattern = /xd ((ff) gggg)?/g;
let matches = pattern.exec(text); //每次调用都返回一个匹配项，即使是全局模式
matches[0] //与整个模式匹配的字符串
matches[1] // 除了第一项以外，其他项为与模式中捕获组匹配的字符串
test(text) 接收一个字符串参数，在模式与该参数匹配是返回true
// RegExp构造函数属性
leftContext | $`(短属性名)  // 匹配项左部文本
rightContext | $'(短属性名)  // 匹配项右部文本
// 案例
if(pattern.test(text)){
    console.log(RegExp.leftContext)  // 或
    console.log(RegExp["$`"])
}
// 用于获取捕获组
RegExp.$1, RegExp.$2, RegExp.$3
4.函数

函数内部属性 arguments对象有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数 arguments.callee(arg) //调用函数自身，在严格模式下运行时会导致错误
函数属性 length 表示函数希望接收的命名参数的个数 prototype 保存所有实例方法
函数方法
apply() // 接收两个参数，一个是作用域，另一个是参数数组
call() // 第一个参数是作用域， 剩下的参数是函数需要接收的参数，需要一一列出
bind() // 该方法会创 建一个函数的实例，其this值会被绑定到传给bind()函数的值 IE9+支持
valueOf() / toString() // 返回函数的代码
5.基本包装类型

Number
toFixed(n) // 按照指定的小数位返回数值的字符串表示（可以自动四舍五入）
String
charAt(n) // 返回给定位置的字符
charCodeAt(n) // 返回给定位置的字符编码
"dddd"[n] // 访问字符串特定索引的字符
concat() //用于将一个或多个字符串拼接起来
slice(start, end) / substring(start, end)  // 返回一个新的从开始位置到结束位置的字符串，不包括结束位置
substr(start, len) // 返回一个新的从开始位置到指定长度的字符串
indexOf(str,[startIndex]) // 返回指定字符在字符串中的索引，第二个参数为从指定位置开始搜索，可选
trim() // 该方法会创建一个字符串的副本，删除前置与后缀的所有空格，返回结果
toLowerCase() / toUpperCase() // 小写大写转换
// 字符串的模式匹配方法
1.match(pattern) //本质上与RegExp的exec()方法相同，只接受一个参数，即正则表达式或RegExp对象
2.search(pattern) // 参数与match参数相同，返回字符串中第一个匹配项的索引
3.replace(str | pattern, text | fn)  //第一个参数为想要被替换的字符串或正则表达式，第二个参数为要替换的字符串或一个函数
* 如果第二个参数是字符串，可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。
    $' //匹配的子字符串之后的子字符串
    $` //匹配的子字符串之前的子字符串
    $n //匹配第n个捕获组的子字符串
* 如果第二个参数是函数，在只有一个匹配项时，会向函数传递3个参数，模式的匹配项，模式的匹配项在字符串中的位置，原始的字符串
                    正则表达式中定义了多个捕获组的情况下，传递的参数依次是模式的匹配项，第一个捕获组的匹配项，第二个捕获组的匹配项...，最后两个参数和上者相同
如：
function htmlEscape(text){
    return text.replace(/[<>&"]/g, (match, pos, originalText) => {
        switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;"
        }
    })
}

4.split() // 第一个参数是需要指定分隔符匹配中的字符串或者正则表达式，也可以传递第二个参数，用来限制返回数组的长度
例：
let text = "xujaing,red,ddd";
text.split(",")  // ["xujaing", "red", "ddd"]
text.split(",", 2)  // ["xujaing", "red"]
text.split(/[^\,]+/)  //*** 匹配非字母，用字符串的非字母分割字符串，返回数组

* 5.localeCompare() // 比较两个字符串，如果字符串在字母表中排在字符串参数之前，返回负数，相等返回0，反之正数
单体内置对象
Global对象
1.URI编码方法
    encodeURI()           // 除了空格之外其他字符都不编码
    encodeURIComponent()  //会对它发现的任何非标准字符进行编码
    decodeURI()           //只能对使用encodeURI的字符进行解码
    decodeURIComponent()  // 原理同上

Math对象
1.Math.max() / Math.min() // 接收任意多数值作为参数
// 求数组中最大值 Math.max.apply(Math, arrValue)
2.Math.ceil() / Math.floor() / Math.round()  //向上/下/四舍五入
3.Math.random()  //返回大于等于0小于1的随机数
4.Math.abs() //返回参数的绝对值
5.Math.pow(num,power) // 返回num的power次幂
6.Math.sqrt(num) // 返回num的平方根
六.面向对象的程序设计

1.属性类型

// 1.数据属性
    let person = {};
    Object.defineProperty(person, "name", {
        configurable: true,  //表示能否通过delete删除属性从而重新定义属性，能否修改属性
        enumerable: true,  //表示能否通过for-in循环返回属性
        writable: true,  // 表示是否能修改属性的值
        value: "xujiang" // 属性的值
    })
    /* 在调用Object.defineProperty()方法创建一个新属性时，如不指定前三个属性字段，默认值都为false, 如果是修改已定义的属性时，则没有此限制 */

// 2.访问器属性get/set
    let person = {name: "xujaijgn", year: 11};
        Object.defineProperty(person, "_name", {
            get: function(){
                return this.name
            },
            // 定义Set时，则设置一个属性的值时会导致其他属性发生变化
            set: function(newValue){
                this.name = newValue;
                this.year = 12;
            }
        })

// 定义多个属性
Object。defineProperties(book, {
    _year: {
        writable: false,
        value: 2001
    },
    year: {
        get: function(){
            return _year
        },
        set: function(newValue){
            this._year = newValue;
        }
    }
})
2.创建对象

1.工厂模式---返回新对象的方式
2.构造函数---定义函数，通过new操作符创建对象（任何函数通过new操作符调用都可以看作构造函数）
   缺点：每个方法在实例中都要重新创建一遍
3.原型模式 （book.prototype.name = "aaa")
    优点：可以让每个实例对象共享它所包含的方法
    缺点： 属性共享，对于引用类型值的属性，实例会共享属性
    理解原型：
        1.isPrototypeOf() // 确定对象之间是否存在原型关系
        2.Object.getPrototypeOf(object1) // 获取实例对象的原型
        3.我们可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值，如果该实例有与原型相同的属   性名，则会屏蔽原型中的属性
        4.hasOwnProperty(name) // 检测一个属性是否在实例中
        5.原型与in操作符 "name" in person  // 对象能访问到给定属性时返回true
        6.Object.keys(obj) // 返回一个包含所有可枚举属性的字符串数组（实例属性）
        7.Object.getOwnPropertyNames() //获取所有实例属性，包括不可美枚举的
        8.实例中的指针只指向原型，而不指向构造函数
        9.重写原型对象会切断现有原型与之前存在的对象实例之间的联系，他们引用的任然是最初的原型
4.组合式（构造函数模式和原型模式）
    1.用构造函数定义实例属性，用原型定义方法和共享属性
5.动态原型模式（通过检查某个应该存在的方法是否存在，来决定需要初始化原型
6.稳妥构造函数模式（适合在某些安全环境下工作）
    function Person(name,year,job){
        var o = new Object();
        // 这里可以添加私有变量和方法
        o.sayName = () => name

        return o
    }
3.继承（原型链是实现继承的主要方式）

1.原型链的问题
    1.包含引用类型值的原型属性会被所有实例共享，在通过原型实现继承时，原型实际上会变成另一个类型的实例，原先的实例属性变成了现在的原型属性。
    2.在创建子类型的实例时，无法向父类构造函数传递参数

2.借用构造函数（在子类型构造函数的内部调用父类构造函数）
    //此时实例不会共享属性
    function Parent(name){
        this.colors = [1,3,4];
        this.name = name;
    }
    function Child(name){
        Parent.call(this, name);
        this.age = 12;
    }
    // 存在的问题： 1.函数无法复用 2.父类的原型对于子类是不可见的

3.组合继承（使用原型链继承原型属性和方法，使用借用构造继承实例属性） ---最常用的继承模式
    缺点：无论如何都会调用两次父类构造函数
    // 父类
    function Parent(name){
        this.name = "xujaing";
        this.age = 12;
    };
    Parent.prototype.say = function() { console.log(this.age) };
    // 子类继承父类
    function Child(name){
        Parent.call(this, name);
        this.age = 13;
    }
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
    Child.prototype.say = function() { alert(this.age) };

4.原型式继承
    实现1.
        function object(o){
            function F(){};
            F.prototype = o;
            return new F()
        }
    实现2.通过Object.create(prototype, properties) // 第一个参数为创建新对象原型的对象，第二个参数为对新对象定义额外属性的对象（和defineProperties方法的第二个参数格式相同）
    Object.create(person, {
        name: {
            value: "xujiang"
        }
    })
5.寄生组合式继承（通过借用构造函数继承属性，通过原型链混成的方式继承方法）---最理想的继承范式
    function inheritPrototype(sub,sup){
        let prototype = Object.create(sup.prototype);
        prototype.constructor = sub;
        sub.prototype = prototype;
    }

    function Sup(){}
    Sup.prototype.say = function(){}
    function Sub(arg){
        // 关键
        Sup.call(this,arg);
    }
    // 关键
    inheritPrototype(Sub, Sup);
七.函数表达式

闭包与变量

闭包只能取得包含函数中任何变量的最后一个值
解决方案
    function createFunction(){
        let arr = [];
        for(let i=0; i< 10; i++){
            arr[i] = function(num){
                return function(){
                    return num
                }
            }(i)
        }
        return arr
    }
this对象

在全局函数中，this等于window,而当函数被当作某个对象的方法调用时，this等于那个对象。不过，匿名函数的执行环境具有全局性，因此其this对象通常指向window
(object.say = object.say)() 此时函数内部this指向window,因为该赋值表达式的值是函数本身，所以this的值不能得到维持
内存泄漏

1.如果闭包的作用域链中保存着一个html元素，那就意味着该元素永远无法销毁。
2.闭包会引用包含函数的整个活动对象，而其中包含着html,因此有必要把其设置为null
function a(){
    let el = $("#el");
    let id = el.id;
    el.click(function(){
        alert(id)
    })
    // 清空dom,释放内存
    el = null;
}
八.BOM对象

1.window

BOM的核心对象是window,他表示浏览器的一个实例。
全局变量不能通过delete操作符删除,而直接定义在window对象上的属性可以删除
2.窗口位相关属性

窗口位置(不同浏览器实现不一样，所以位置获取的不精确和统一)

let leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
let top = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;

// 获取页面视口
let pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
3.系统对话框

// 显示打印对话框
window.print()
4.location对象

// location即是window对象的属性也是document对象的属性
1. hash // "#contents" 返回url的hash,如果不包含返回空
2. host // "www.wrox.com:80" 返回服务器名称和和端口号
3. hostname // "www.wrox.com" 返回不带端口号的服务器名称
4. href // 返回当前加载页面的完整url
5. pathname // "/a/" 返回url中的目录或文件名
6. port // "8080" 返回url中指定的端口号
7. protocol // "http" 返回页面使用的协议
8. search // "?q=java" 返回url中查询字符串，以问号开头

// 获取查询字符串
function queryObj(){
    let qs = (location.search.length > 0 ? location.search.substring(1) : ''),
    arg = {},
    items = qs.length ? qs.split('&') : [],
    item = null,
    name = null,
    value = null,
    i = 0,
    len = items.length;

    for(i;i<len;i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            arg[name] = value;
        }
    }

    return args
}
// 位置操作
1.location.assign(url)  //打开新链接，并在浏览器历史记录里生成一条记录
2.location.href = url;  //打开新链接，并在浏览器历史记录里生成一条记录
3.location.hash = "#detail" // 在url后添加hash
4.location.hostname = "www.baidu.com" //修改服务器名称
5.location.pathname = "home" //修改路径
6.location.port = 8080; // 修改端口号
***通过以上方法修改url后会在浏览器历史中生成一条记录，用户点击后退可以导航到前一个页面。
7.location.replace(url) // 此方式不会在浏览器中生成新记录，用户不能回到前一个页面
8.location.reload([true]) // 页面会以最有效的方式重新加载（有可能从缓存中加载），如果参数为true，则将从服务器中加载
5.navigator对象

navigator.language // "zh-CN" 浏览器的主语言
navigator.appName  // "Netscape" 完整的浏览器名称
navigator.appVersion // 浏览器的版本
// 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36
navigator.cookieEnabled // true 表示cookie是否启用
navigator.javaEnabled() // 表示浏览器是否启用java
navigator.onLine // true 表示浏览器是否连接到了因特网
navigator.platform // "Win32" 浏览器所在的系统平台
navigator.userAgent // 浏览器用户代理字符串
// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36"
navigator.plugins // 检测浏览器中安装的插件的数组
6.history对象

1. history.go(0 | [123] | -1 | str) // 如果是Str,则会跳转到历史记录中包含该字符串的第一个位置
2. history.back() //后退一页
3. history.forward() //前进一页
4. history.length // 保存着历史纪录的数量
九.客户端检查

1.检查用户代理

let client = function() {
    //呈现引擎
    let engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        // 完整版本号
        ver: null
    };
    // 浏览器
    let browser = {
        // 主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        // 具体版本号
        ver: null
    };

    // 平台/设备/操作系统
    let system = {
        win: false,
        mac: false,
        x11: false,
        // 移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        // 游戏系统
        wii: false,
        ps: false
    };

    // 检测呈现引擎和浏览器
    let ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        // \S 匹配一个非空白字符
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
        // 确定是chrome还是safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parentFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parentFloat(browser.ver);
        } else {
            //近似的确定版本号
            let safariVersion = 1;
            if (engine.webkit < 100) {
                let safariVersion = 1;
            } else if (engine.webkit < 312) {
              let safariVersion = 1.2;  
            } else if (engine.webkit < 412) {
              let safariVersion = 1.3;
            } else {
                let safariVersion = 2;
            }

            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);

        // 确定是不是firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }

    // 检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    // 检测平台
    let p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "x11") || (p.indexOf("Linux") == 0);

    // 检测window操作系统
    if (system.win) {
        if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch(RegExp["$2"]) {
                    case "5.0":
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }

    // 移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("ipad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    // windows mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }

    // 检测ios版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iphone)?OS (/d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2;  //不能正确检测出来，只能猜测
        }
    }

    // 检测android
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parsentFloat(RegExp.$1);
    }

    // 游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    // 返回检测对象
    return {
        engine: engine,
        browser: browser,
        system: system
    }
}();
十. DOM

1.将NodeList对象转换为数组

let arrayNodes = Array.prototype.slice.call(someNode.childNodes, 0);
2.hasChildNodes() ---在节点包含一或多个子节点的情况下返回true

3.操作节点

1.appendChild() //用于向childNodes末尾添加一个节点，返回新增的节点，如果节点已存在，那么就是从原来的位置移动到新位置
2.insertBefore() //将节点插入指定位置，接收两个参数，要插入的节点和作为参照的节点，返回插入的节点
3.replaceChild() //替换指定节点，接收2个参数，要插入的节点和要替换的节点，返回被移除的节点
4.removeChild() //移除节点，返回被移除的节点
5.cloneNode([true]) //参数为true,执行深复制，复制节点及整个子节点，为false时复制节点本身。cloneNode不会复制节点的javascript属性，但IE在此存在一个bug,所以建议在复制之前最好先移除事件处理程序
4.访问节点

Node.firstChild[lastChild | parentChild | nextSibling | previousSibling]
5.Document类型

1. document的节点类型nodeType的值为9；
2. document.documentElement // 取得对<html>的引用
3. document.body // 取得对body的引用
4. document.title // 取得文章标题
5. document.title = "xxx" //设置文章标题
6. document.URL //取得完整的url
7. document.domain //取得域名
8. document.referrer //取得来源页面的url
6.Element类型

1.nodeType值为：1
2.nodeName的值为元素标签名
3.tagName // 元素标签名，返回大写值，比较时一般采用 element.tagName.toLowerCase()
4.取得元素属性 getAttribute() / setAttribute() / removeAttribute()
// 注：自定义属性通过点语法访问时会返回undefined
5.attributes // 获取元素的属性集合，访问方法： element.attributes[i].nodeName / element.attributes[i].nodeValue
6.创建元素 // document.createElement("div" | "<div class=\"box\">aaa</div>")
7.创建文本子节点 // document.createTextNode("Hello world")
7.DocumentFragment类型

1.nodeType值为：11
2.创建文档片段 document.createDocumentFragment()
// let fragment = document.createDocumentFragment()
十一.DOM扩展

1.选择符

querySelector() // 参数为css选择符，返回与该模式匹配的第一个元素，没有找到返回null
querySelectorAll() // 返回所有匹配的元素，底层实现类似于一组元素的快照
2.元素遍历(不包含文本节点和注释)

// ie9+支持
1.childElementCount // 返回子元素的个数
2.firstElementChild // 指向第一个子元素
3.lastElementChild // 指向最后一个子元素
4.previousElementSibling // 指向前一个同辈元素
5.nextElementSibling // 指向后一个同辈元素
3.与类相关的扩充

classList
    1.classList.length // 返回包含元素的个数
    2.classList.remove() //接收一个类名，从列表中删除给定类名
    3.classList.toggle() //如果列表中存在给定的值，删除它，否则添加它
    4.classList.add() //将给定的字符串添加到列表中，如果已经存在，就不添加
    5.classList.contains() //表明列表中是否存在给定的值，存在则返回true,否则返回false
4.焦点管理

元素获得焦点的方式有： 页面加载，用户输入，在代码中调用focus

1.document.activeElement //始终会引用dom中获得焦点的元素,文档刚刚加载完成时，保存的是document.body元素的引用，文档加载期间的值为null
2.document.hasFocus() //用于确定文档是否获得了焦点，是则返回true
5.HTMLDocument的变化

readyState属性
    1.loading //正在加载文档，可以在onload外使用
    2.complete //文档加载完毕。只能在onload内获取
// 例子
if(document.readyState == "complete") {
    // 执行操作
}
6.插入标记

insertAdjacentHTML()
// 1.作为前一个同辈元素被插入
el.insertAdjacentHTML('beforebegin', '<p>hello world</p>');
// 2.作为第一个子元素被插入
el.insertAdjacentHTML('afterbegin', '<p>hello world</p>');
// 3.作为最后一个子元素被插入
el.insertAdjacentHTML('beforeend', '<p>hello world</p>');
// 4.作为后一个同辈元素被插入
el.insertAdjacentHTML('afterend', '<p>hello world</p>');
7.children

// 获取元素集合，只包含元素节点
el.children.length | el.children[i]
8.contains() 判断某个节点是否是另一个节点的后代

// 例子
parentEl.contains(childEl); // 如果childEl是parentEl的后代，则返回true
十二.DOM2和DOM3

1.框架的变化

// 访问内联框架的文档对象,如果内联框架来自不同域或者不同协议，访问该文档时会报错
let iframe = document.getElementById("iframe");
let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
2.元素大小

1.偏移量
    1.offsetHeight/offsetWidth // 元素宽高，包括滚动条，边框
    2.offsetLeft/offsetTop // 元素外边框到包含元素内边框的距离
    3.offsetParent //保存着包含元素的引用（具有大小的包含元素的引用）
// 获取元素在页面中的偏移量
function getElLeft(el){
    let actualLeft = el.offsetLeft;
    let current = el.offsetParent;
    while(current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft
}
// 注： 这些偏移量都是只读的，每次访问都要重新计算，因此最好将其保存到局部变量里，以提高性能

2.客户区大小clientWidth/clientHeight（元素内容及内边距所占据的空间）
    获取视口大小 clientW = document.body.clientWidth || document.documentElement.clientWidth;

3.滚动区大小
    1.scrollHeight //在没有滚动条的情况下，元素内容总高度（内容+内边距）
    2.scrollWidth
    3.scrollLeft //被隐藏在内容区域左侧的像素数
    4.scrollTop //被隐藏在内容区域上方的像素数,通过设置该值可以让滚动条滚动到响应位置
    *** 确定文档总高度兼容方案
    let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
    let clientH = document.documentElement.clientHeight || document.body.clientHeight;
    let docHeight = Math.max(scrollH, clientH);

4.确定元素大小 getBoundingClientRect()
    该方法返回一个矩形对象，包括left,top,right,bottom属性，表示元素在页面中相对于视口的位置
十三.事件

1.事件对象(event)

1. 属性或方法
    type // 被触发的事件类型
    target // 事件的目标
    currentTarget // 事件处理程序当前正在处理事件的那个元素
    注： 在事件处理程序内部，对象this始终等于currentTarget的值，而target只包含事件的实际目标
    *** 一个函数处理多个事件可以使用switch(event.type)的方式
    event.preventDefault() // 阻止事件的默认行为
    event.stopPropagation() // 阻止事件冒泡
2.事件类型

1.鼠标和滚轮事件
    1.客户区坐标位置clientX/clientY  //表示事件发生时鼠标指针在视口中的水平和垂直位置
    2.页面坐标位置 pageX/pageY  //表示事件在页面中发生的位置
    3.屏幕坐标位置 //获取事件发生时在屏幕中的位置

2.修改键(如果用户在触发事件时按下了shift/ctrl/alt/Meta,则返回true)
    event.shiftkey | event.altKey | event.metaKey | event.ctrlKey

3.鼠标按钮(event.button)
// 对于mousedown和mouseup,其event中存在一个button属性，值为0表示主鼠标按钮，1表示中间鼠标按钮，2表示次鼠标按钮

4.鼠标滚轮事件（mousewheel）
    1.兼容方案：
        let getWheelDelta = function(event){
            let wheelDelta = event.wheelDelta ? event.wheelDelta : (-event.detail * 40);
            return wheelDelta
        }
    *** 注：document在普通浏览器中通过mousewheel监听鼠标滚轮事件，在火狐中使用DOMMouseScroll监听

5.键盘与文本事件
6.变动事件
    1.DOMSubtreeModified | DOMNodeInserted | DOMNodeRemoved
    *例子
        el.addEvent("DOMSubtreeModified", fn1)

7.HTML5事件
    1.contextmenu事件（自定义上下文菜单）
    2.DOMContentLoaded事件（在形成完整dom树之后就触发，不理会图像，js文件，css文件等资源是否下载完成）
    3.hashchange事件（在URL的参数列表发生变化【即#号后面的所有字符串】时触发）
    注：必须要把hashchange添加给window对象，event对象包含两个属性oldURL和newURL,分别保存着参数列表变化前后的完整URL
    // 例子
    window.addEvent("hashchange", function(event){
        // oldURL和newURL存在兼容问题，最好用location.hash代替
        console.log(event.oldURL, event.newURL);
    })
3.性能与内存

如果在页面写在之前没有清理干净事件处理程序，那他们就会滞留在内存中，每次加载完页面再卸载时，内存中滞留的对象就会增加，因为事件处理程序占用的内存并没有被释放。 【解决方案】再页面卸载之前，先通过onunload事件处理程序移除所有事件处理程序。但是使用onunload时页面不会被缓存bfcache（即往返缓存）中。

十四.表单脚本

1.选择文本inputEl.select() [用于选择文本框中的所有文本，不接受参数，可以在任何时候调用]

2.选择事件（select） //ie9+ 用户选择了文本并释放鼠标时触发

3.取得选择的文本

// ie9+ 为被选择的元素添加了两个属性，selectionStart和selectionEnd,保存的是基于零的数值，表示所选的文本范围
function getSelectedText(textbox){
    return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd)
}
4.选择部分文本

// 所有文本框都有一个setSelectionRange(startIndex, endIndex)
textbox.setSelectionRange(0, 3)
5.过滤输入

1.屏蔽字符
// 通过阻止键盘按压事件的默认行为来屏蔽字符
el.addEvent("keypress",function(event){
    let charCode = event.charCode;
    // String.fromCharCode(charCode) 将字符编码转换为字符串
    if(!/\d/.test(String.fromCharCode(charCode))){
        event.preventDefault();
    }
}, false)
6.富文本编辑

1.使用contenteditable属性 1.有三个属性: true,false,inherit 2.例子：




2.操作富文本document.execCommand()

三个参数： 要执行的命令的名称，表示浏览器是否为当前命令提供用户界面的一个布尔值，执行命令必须的一个值（如果不需要值，则为null）
3.表单与富文本 *** 要想将富文本中的值传递给表单，则可在表单内创建一个隐藏的表单字段，将富文本的值赋给该表单字段的值

十四.HTML5脚本编程

1.跨文档消息传递

主要指来源于不同域的页面间的消息传递，主要利用iframe

// 源页面
window.onload = function(){
    // 获取源页面iframe的内容window对象
    var iframeWindow = document.querySelector("#iframe").contentWindow;
    // 向iframe发送消息，并指定源的地址，两个参数必填
    iframeWindow.postMessage("xujiang", "http://127.0.0.1:5500");

    var mesWrap = document.querySelector(".mes-wrap");
    // 接收iframe传来的消息
    window.addEventListener("message",function(e){
    // alert(e.data);
        mesWrap.innerHTML = e.data;
        iframeWindow.postMessage("你叫什么？", "http://127.0.0.1:5500");
    },false);
}

// iframe页面，监听其他域传来的消息
window.addEventListener("message",function(e){
    // 向发送消息的域反馈消息，event对象的属性如下：
    // data 传入的字符串数据
    // origin 发送消息的文档所在的域
    // source 发送消息的文档的window的代理
    e.source.postMessage("hello", "http://127.0.0.1:5500");
},false);
2.原生拖放

3.自定义媒体播放

// 使用video,audio元素的play()和pause()方法，可以手工控制媒体的播放
// 根据媒体元素的属性，我们可以自己实现一个视频，音频播放器
十五.ajax和comet

// ajax
var xhr = new XMLHttpRequest(); // 创建xhr对象

// 第一个方法：open(get | post等, "exam.php", false) 参数为请求类型,请求url,是否异步的boolean
xhr.open("get","exam.php", false); // 调用该方法并不是真正的请求，而是请求一个请求以备发送

// 发送真正的请求，接收一个参数，即作为请求主体要发送的数据，不发送数据时必须传递null,因为对于某些浏览器来说该参数是必须的
xhr.send(null)

// 检验响应的状态--->针对同步
if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
    var data = xhr.responseText;
}else{
    console.log(xhr.status);
}

// 异步方案
xhr.onreadystatechange = function(){
    // xhr.readyStatus表示请求/响应过程的当前活动阶段
    // 0 未初始化，还没调用open()
    // 1 启动，已调用open()方法但未调用send()
    // 2 发送， 已调用send()方法，但未收到响应
    // 3 接收，已接收到部分响应数据
    // 4 完成，已接受到全部响应数据
    if(xhr.readyStatus == 4){
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            var data = xhr.responseText;
        }else{
            console.log(xhr.status);
        }
    }
}
xhr.open("get","exam.php", false);
xhr.send(null);

// 在接收到响应之前还可以取消异步请求
xhr.abort() // 在停止请求之后还应该进行解引用操作，防止内存堆积

// 设置http请求头，必须放在open和send中间
xhr.open("get","exam.php", false);

xhr.setRequestHeader("accept", "application/json; charset=utf-8")

xhr.send(null);

// 获取响应头信息
xhr.getResponseheader("accept");
xhr.getAllResponseHeaders();

// get请求：向现有url中添加查询字符串
function addUrlParam(url, name, value){
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

// post请求：模拟表单提交
xhr.open("get","exam.php", false);
// 设置提交时的内容类型
xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded")
// 假设表单form对象已获取
xhr.send(serialize(form));

// XHR2级 -- formData --序列化表单以及创建和表单格式相同的数据（用于通过xhr传输）
var data = new FormData();
data.append(key,value);
// 也就可以用表单元素的数据预先填入数据
var data = new FormData(document.forms[0]);
//使用FormData的好处在于不必明确地在xhr上设置请求头部
xhr.send(new FormData(form));

// 进度事件
loadStart/progress/error/abort/load

// 跨域资源共享CORS
核心思想： 使用自定义的http头部让浏览器和服务器进行沟通，从而决定请求是成功还是失败
原理：
1.请求头指定源：Origin: http://www.baidu.com
2.如果服务器认为这个请求可以接受，就在Access-Control-Allow-Origin头部回发相同的源信息
Access-Control-Allow-Origin：http://www.baidu.com
（如果是公共资源，可以回发“*”）
3.如果没有这个头部，或者有这个头部但是源信息不匹配，浏览器就会驳回请求

// 主流浏览器对cros的实现方式： 在url中使用绝对路径，但有限制：不能设置自定义头部，不能发送和接收cookie,获取不到getAllResponseHeaders()的返回值

// 带凭据的请求
withCredentials属性设置为true
// 服务器接收到带凭据的请求后，会用下面的头部来请求，如果响应不包含这个头部，浏览器将不会把响应数据交给js
Access-Control-Allow-Credentials: true

// 跨浏览器的cros
function createCORSRequest(method,url){
    var xhr = new XMLHttpRequest();
    if("withCredentials" in xhr){
        xhr.open(method,url,true);
    }else if(typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method,url);
    }else{
        xhr = null;
    }
    return xhr
}
var req = createCORSRequest("get","http://www.baidu.com/page/");
if(req){
    req.onload = function(){
        // 对响应数据进行处理
    };
    req.send();
}
// 以上提供的公共方法有
// abort() 用于停止正在进行的请求
// onerror 用于替代onreadystatechange检验错误
// onload 用于替代onreadystatechange检验成功
// responseText 用于取得响应内容
// send() 用于发送请求

// 其他跨域技术
1.图像ping---常用于跟踪用户点击页面和动态广告曝光数，只能get请求
    var img = new Image();
    img.onload = img.onerror = function(){
        // 操作
    }
    img.src = "http://baidu.com?name=xujaing";

2.JSONP---可以直接访问响应文本，可以在浏览器和服务器之间进行双向通信，但有安全隐患
    function handleResponse(data){
        console.log(data);
    }
    var script = document.createElement("script");
    script.src = "http://a.net/json/?callback=handleResponse";
    document.body.insertBefore(script, document.body.firstChild);

3.Comet (服务器推送SSE)
    常用的技术有长轮询和流
4.Web Sockets
十六.高级技巧

1.高级函数

//安全类型检测
function isArray(value){
    return Object.prototype.toString.call(value) == "[object Array]";
}
// 注：在ie中在以COM对象形式实现的任何函数，isFunction()都将返回false
function isFunction(value){
    return Object.prototype.toString.call(value) == "[object Function]";
}

// 使用作用域安全的构造函数
// 惰性载入函数
// 函数绑定 会占用更多内存，所以只在必要时使用
function bind(fn, context){
    return function(){
        return fn.apply(context, arguments);
    }
}
// ES5提供了原生的绑定方法：obj.bind(this);

// 函数柯里化
function curry(fn){
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs)
    }
}
// 使用
function add(n1,n2){
    return n1 + n2
}
var curriedAdd = curry(add, 5);
console.log(curriedAdd,5);
2.防篡改对象

// 不可扩展对象,使用该方法可以让传入的对象禁止添加属性和方法
Object.preventExtensions(obj);
// 使用Object.isExtensible(obj)可以判断对象是否可扩展
Object.isExtensible(obj);

// 密封的对象,不可扩展，不能删除，但可以修改
object.seal(obj);
// 使用Object.isSealed()可以确定对象是否密封
Object.isSealed(obj);

// 冻结的对象,不可扩展，密封，不能修改，访问器属性可写
Object.freeze(obj);
3.高级定时器

// 函数节流
function throttle(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    }, 100)
}
4.自定义事件

function EventTarget(){
    this.handlers = {};
}
EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type, handler){
        if(typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(event){
        if(!event.target){
            event.target = this;
        }
        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for(var i=0,len=handlers.length;i<len;i++){
                handlers[i](event);
            }
        }
    },
    removeHandler: function(type, handler){
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i=0, len=handlers.length; i<len; i++){
                if(handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}
十七.离线应用与客户端存储

1.离线检测

// 离线检测属性
navigator.onLine // true or false
// 离线事件
online,offline
2.应用缓存

// 描述文件： offline.manifest，列出要下载和缓存的资源
// ***文件扩展名以前推荐manifest,现在推荐用appcache
CACHE MANIFEST
#Comment

file.js
file.css

// 与html文档关联
<html manifest="/offline.manifest">
3.web存储机制（cookie,localStorage,sessionStorage,indexedDB）

十八.新兴API

1.requestAnimationFrame()

(function(){
    function draw(timestamp){
        // 计算两次重绘的时间间隔
        var drawStart = (timestamp || Date.now()),
        diff = drawStart - startTime;

        // 使用diff确定下一步的绘制时间

        // 把startTime重写为这一次的绘制时间
        startTime = drawStart;

        // 重绘UI
        requestAnimationFrame(draw);
    }

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
    startTime = window.mozAnimationStartTime || Date.now();
    requestAnimationFrame(draw);
})();
2.File API

//通过监听change事件并读取files集合，就可以知道每个文件信息
fileList.addEventListener("change", function(event){
    var files = event.target.files,
    i=0,
    len = files.length;
    while(i<len){
        console.log(files[i].name, files[i].type, files[i].size);
        i++;
    }
}, false);

// FileReader类型
 reader = new FileReader();
while(i<len){
    // reader.readAsDataURL(files[0]);
    reader.readAsText(files[0]);
    // reader.readAsBinaryString(files[0]);
    //reader.readAsArrayBuffer(files[0]);

    // 由于读取是异步的，所以支持load,error,progress等事件，progress在当读取了新数据是触发，每50ms触发一次
    // 触发error事件时会将相关信息保存在error属性中，该属性保存了一个对象，只有一个属性code, 1表示未找到文件，2表示安全性错误，3表示读取中断，4表示文件不可读
    reader.onload = function(){
        // 读取结果存在result属性中
        console.log(reader.result);
    }
    // 如果想中断读取，可以调用absort()方法，此时会触发loadend事件

    // console.log(files[i].name, files[i].type, files[i].size);
    i++;
}

// 读取部分内容--file对象支持slice属性
function blobSlice(blob, startByte, length){
    // blob为文件对象，startByte为起始字节，length为要读取的字节数
    if(blob.slice){
        return blob.slice(startByte, length)
    }else if(blob.webkitSlice){
        reutrn blob.webkitSlice(startByte, length)
    }else if(blob.mozSlice){
        return blob.mozSlice(startByte, length)
    }else{
        retun null
    }
}

var reader = new FileReader(),
blob = blobSlice(files[0], 0, 32);
if(blob){
    reader.readAsText(blob);
}

// 对象URL -- 指的是引用保存在File或Blob中数据的URL
function createObjectURL(blob){
    if(window.URL){
        return window.URL.createObjectURL(blob);
    }else if(window.webkitURL){
        return window.webkitURL.createObjectURL(blob);
    }else{
        return null
    }
}

var url = createObjectURL(files[0]);
if(url){
    img.src = url;
}

// 手工释放window.URL内存
function revokeObjectURL(url){
    if(window.URL){
        window.URL.revokeObjectURL(url);
    }else if(window.webkitURL){
        window.webkitURL.revokeObjectURL(url);
    }
}

// 读取拖放的文件

//使用XHR上传文件-- 利用FormData对象
3.web workers-- 主要针对复杂的计算，不会影响用户体验

// 页面worker
var worker = new Worker("work.js");
worker.postMessage("hello");
worker.onmessage = function(event){
    var data = event.data;
    alert(data)
}

worker.onerror = function(event){
    console.log("Error:" + event.filename,event.lineno,event.message);
}

// 任何时候只要调用terminate()方法就可以停止worker工作

// work对象内部 work.js
// importScripts会保证引入文件的先后顺序执行，但下载是异步的
importScripts("k1.js","k2.js");
// k1.js中定义b=1,此时可以直接引用k1,k2中定义的变量和方法
// work对象的全局对象：
// navigator对象：包含onLine,appName,appVersion,userAgent,platform
// 只读的location
// setTimeout,setInterval,clearTimeout,clearInterval
// XMLHttpRequest构造函数
self.onmessage = function(event){
    var data = event.data;
    self.postMessage(c);
}