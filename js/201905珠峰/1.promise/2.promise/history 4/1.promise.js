// let Promise1 = require('./promise');


let p = new Promise1((resolve,reject)=>{
    resolve();
});

let promise2 = p.then(function(data){
    return new Promise((resolve,reject)=>{
        resolve(new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve('hello')
            }, 1000);
        }))
    })
   
})
promise2.then(data=>{
    console.log(data);
},function(err){
    console.log(err,'err');
})