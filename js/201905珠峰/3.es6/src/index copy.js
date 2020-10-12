// npm install 
// npm run dev

// amd cmd umd
// es6 模块 esmodule node模块 commonjs规范
// 静态 只能在最外层使用 动态的 代码块中动态导入
// 模块化的好处 封装 保护变量名不冲突

// 导入 import 导出 export

// import _,{c} from './a';
// import * as obj from './a';
// // 每次拿到的是接口
// setInterval(() => {
//     console.log(obj.default) 
// }, 1000);
console.log(obj);
import * as obj from './useC';
// import 有声明的功能 function 但是不能重复声明

// 实验型语法里  import() 动态的导入
setTimeout(()=>{
    import(/* webpackChunkName: "MyFile" */ './a').then(data=>{
        console.log(data);
    })
},3000)
 // webpack
   


