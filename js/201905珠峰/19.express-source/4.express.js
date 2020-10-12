const express = require('./express');
const app = express(); // app就是一个路由系统
const user = express.Router(); // Router就是之前写的Router
user.get('/add',function(req,res){
    res.end('add')
})
user.get('/delete',function(req,res){
    res.end('delete')
})
app.use('/',user); 
const user1 = express.Router();
user1.get('/manager',function(req,res,next){
    res.end('manager')
});
app.use('/user',user1)
app.listen(3000); 