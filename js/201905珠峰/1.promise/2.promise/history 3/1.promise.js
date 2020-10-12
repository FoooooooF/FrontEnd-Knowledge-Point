
let fs = require('fs');
let Promise = require('./promise')
function read(filePath){
    return new Promise((resolve,reject)=>{
        resolve(1)
    })
}
let promise2 = read('./name.txt').then(data=>{
    return new Promise((resolve,reject)=>{
        resolve(100);
    })
},()=>{
    return 100
})
promise2.then(data=>{
    console.log(data);
    return 1000;
},function(err){
    console.log('err',err);
})


