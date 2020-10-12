// let Promise1 = require('./promise');
let p = new Promise1((resolve,reject)=>{
    resolve();
});

let promise2 = p.then(function(data){
    let x = new Promise((resolve,reject)=>{
        resolve(new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve('hello')
            }, 1000);
        }))
    })
    return promise2;
})
promise2.then(data=>{
    console.log(data);
},function(err){
    console.log(err,'err');
});

// 值的穿透
let Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
    resolve(1000);
})

p.then(val=>val,(err)=>{
    throw err
}).then(val=>val,err=>{
    throw err
}).then(data=>{
    console.log(data);
},err=>{
    console.log(err,err);
})