// 实现一个模板引擎
let fs = require('fs');
let ejs = require('ejs')
let str = fs.readFileSync('./html.html','utf8');
function render(str,obj){
    str = str.replace(/<%=([\s\S]+?)%>/g,function(){
        return '${'+arguments[1]+'}'
    })
    let head = `let str = '';\r\n`
    head+= `with(obj){\r\n`
    let content = 'str+=`'
    content +=str.replace(/<%([\s\S]+?)%>/g,function(){
        return '`\r\n'+arguments[1] +'\r\nstr+=`'
    });
    // return str.replace(/<%=([\s\S]+?)%>/g,function(){
    //     return obj[arguments[1]]
    // })
    let tail = '`\r\n} return str'
    let scriptStr = head+content+tail;
    let fn = new Function('obj',scriptStr);
    return fn(obj);
}
str = render(str,{name:'hello',arr:[1,2,3,4,5]});
console.log(str);
// 模板引擎的实现原理 拼串
// with 可以改变上下文
// 字符串执行  new Function(形参的名字,str)
