
const Application = require('./application');
const Router = require('./router');
const path = require('path');
const fs = require('fs');
createApplication.Router = Router;
function createApplication(){
    // 创建一个应用
    return new Application(); 
}
createApplication.static = (dirname)=>{
    return function(req,res,next){
        let filePath = path.join(dirname,req.url);
        fs.stat(filePath,(err,statObj)=>{
            if(err){
                return next();
            }
            if(statObj.isFile()){
                fs.createReadStream(filePath).pipe(res);
            }
        })
    }
}
module.exports = createApplication