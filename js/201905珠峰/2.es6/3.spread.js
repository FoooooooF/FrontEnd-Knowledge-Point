// 解构赋值

// 结构相同 可以直接通过相同的结构来取值
let {name:n,age} = {name:'zf',age:10};
// let obj = {name:'zf',age:10};
// let n = obj.name;
// let age = obj.age

let {length} = [];
console.log(length);

// 数组省略第一项
let [,age] = ['zf',18];
console.log(name,age);

// 对象的展开 ...  ,剩余运算符 可以在函数中使用 可以在解构中使用
let arr = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr,...arr2];
let obj = {name:'zf'};
let obj1 = {age:9};
let obj2 = {...obj,...obj1}
console.log(obj2)

// 剩余运算符只能用在最后一项，有收敛的功能，会把剩下的内容重新组装
let [a,...args] = ['zf',18,17,16];
console.log(args);
 
let {name,...obj} = {name:'zf',age:10}
console.log(obj);

// 将类数组转化成数组 Array.from [...{}] 是通过迭代器来实现
function ajax(){
    //console.log(arguments)
    // generator 
    // for of
    console.log([...{0:1,1:2,length:2,[Symbol.iterator]:function * (){
         // yiled 值 
         let i = 0;
        while(this.length !== i){
            yield this[i++]; // {value:0,done:false}
        }
    }}]); // {0:'url',1:'get'}

    // 生成器 迭代器
}
ajax('url','get');

// Array.from [...{}]区别  Symbol.iterator


// {...obj1,...obj2} 覆盖的作用域

