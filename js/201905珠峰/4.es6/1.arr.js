// map,reduce(filter some every forEach) find findIndex

// compose

// reduce 收敛 求和

// let total = [1,2,3,4,5,6].reduce((prev,current,index,arr)=>{
//     return prev+current;
// })

let total = [
  { price: 10, count: 1 },
  { price: 20, count: 2 },
  { price: 30, count: 3 }
].reduce((prev, current, index, arr) => {
  return prev + current.price * current.count;
}, 0);
console.log(total);

// let avg = [1,2,3,4,5,6].reduce((prev,current,index,arr)=>{
//     if(index === arr.length-1){
//         return (prev+current)/arr.length
//     }
//     return prev+current;
// },0);
// console.log(avg);

// compose 组合 可以将多个函数进行组合

function sum(a, b, c) {
  return a + b + c;
}

function len(str) {
  return str.length;
}

function addTag(str) {
  return "$" + str;
}
// let r = addTag(len(sum('a','b','c')));
// reduceRight
// function compose(...fns){
//     return function(...args){
//         let lastFn = fns.pop();
//         return fns.reduceRight((prev,current)=>{
//             return current(prev);
//         },  lastFn(...args));

//     }
// }

// let compose = (...fns) => (...args) => {
//   let lastFn = fns.pop();
//   return fns.reduceRight((prev, current) => current(prev), lastFn(...args));
// };
// 1) a:addTag b:len 
// return function(...args){
//     return addTag(len(...args))
// }
// 2) a:function(...args){
//     return addTag(len(...args))
// }  
// b:sum
// return function(...args){
//     return function(...args){
//         return addTag(len(sum(...args))
//     }  (sum(...args))
// }
// function compose(...fns){
//     return fns.reduce((a,b,index,current)=>{
//         return function(...args){
//             return a(b(...args))
//         }
//     })
// }
// let compose = (...fns)=> fns.reduce((a,b)=>(...args)=> a(b(...args)))
// let r = compose(
//   addTag,
//   len,
//   sum
// )("a", "b", "c");
// // reduce 方法 必须函数不能为空
// let newr = [1].reduce((a,b)=>{
//     console.log(a,b);
// })
// console.log(newr);


Array.prototype.reduce = function(callback,prev){
    for(let i = 0; i < this.length;i++){
        if(typeof prev === 'undefined'){
            prev = callback(this[i],this[i+1],i+1,this);
            i++;
        }else{
            prev = callback(prev,this[i],i,this);
        }
    }
    return prev;
}
let r = [1,2,3,4].reduce((a,b,index,arr)=>{
    return a+b;
},5)
console.log(r);
// 返回一个映射后的数组
let newArr = [1,2,3].map(item=>item*=2);
console.log(newArr)
// 返回一个过滤后的数组
let filter = [1,2,3].filter(item=>item == 2);
console.log(filter);
// 找到true 就返回true
let some = [1,2222,3].some(item=>{
    return /2/.test(item);
});
console.log(some)
// 找到false 就返回false
let every = [1,2,3].every(item=>item==2);
console.log(every)
// 找到后返回找到的那一项
let find = [1,2,3].find(item=>item==2);
console.log(find);
// findIndex
// 数组 includes
console.log([1,2,3].includes(3))