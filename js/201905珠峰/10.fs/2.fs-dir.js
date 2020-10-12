// fs
// 文件操作  目录操作
// fs.readFile writeFile appendFile
// fs.access / fs.stat
// fs.mkdir  fs.rmdir
// fs.rname fs.unlink
// fs.readdir

const fs = require('fs');
let pathUrl = 'c/b/c/d/e';  
// 1) 同步创建
// const mkdirSync = (pathUrl)=>{
//    let pathArr =  pathUrl.split('/');
//    for(let i = 0 ; i < pathArr.length;i++){
//         let current =pathArr.slice(0,i+1).join('/');
//         try{
//             fs.accessSync(current)
//         }catch(e){
//             fs.mkdirSync(current);
//         }
//    }
// }
// mkdirSync(pathUrl)

// 异步创建
// const mkdir = (pathUrl,cb)=>{ // next
//     let pathArr =  pathUrl.split('/');
//     function next(index){
//         // 递归必须要有终止条件
//         if(index === pathArr.length) return cb();
//         let current = pathArr.slice(0,++index).join('/');
//         fs.access(current,(err,data)=>{
//             if(err){
//                 fs.mkdir(current,function(){
//                     next(index);// 当前创建完毕后 创建下一次即可
//                 });
//             }else{ // 如果存在，创建下一层
//                 next(index);
//             }
//         })
//     }
//     next(0);
// }
// mkdir(pathUrl,function(){
//     console.log('成功')
// });

// let path = require('path')
// let arr = fs.readdirSync('d'); // 读取的范围只有一层
// arr = arr.map(dir=>path.join('d',dir))
// console.log(arr); // [ '1.rtxt', 'a' ]

// arr.forEach(dir=>{
//     let statObj = fs.statSync(dir);
//     if(statObj.isFile()){
//         fs.unlinkSync(dir);
//     }else{
//         fs.rmdirSync(dir);
//     }
// })
// fs.rmdirSync('d');
// readdir  stat  unlink rmdir 