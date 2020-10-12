// set map 不能放重复类型 数据结构

let s = new Set([1,2,3]);
// set 他是具备 Symbol.iterator

s.add(3);
console.log(s);
console.log(s.entries()); // Object.keys Object.values Object.entries
s.forEach(s=>{
    console.log(s);
});
console.log(s.has(2));

// 数组去重 交集 并集 差集

let arr1 = [1,2,3,1,2];
let arr2 = [4,5,6,3,2,4];

function union(){
    let s = new Set([...arr1,...arr2]);
    return [...s];
}
console.log(union());

function intersection(){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    // 返回true 表示留下
    return [...s1].filter(item=>{
        return s2.has(item);
    })
}
console.log(intersection());

function difference(){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    // 返回true 表示留下
    return [...s2].filter(item=>{
        return !s1.has(item);
    })
}
console.log(difference());


let map = new Map([['name','2']]);
map.set('name','123');
console.log(map,map.get('name'));


// weakMap 若引用
// v8 垃圾回收的机制 
// http://www.javascriptpeixun.cn/course/12

class MyFn{

}
let mf = new MyFn();
let map = new Map();
map.set(mf,'ok');
mf = null
console.log(map);