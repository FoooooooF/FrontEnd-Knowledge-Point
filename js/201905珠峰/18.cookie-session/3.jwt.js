const Koa = require('Koa');
const Router = require('koa-router');
const jwt = require('jwt-simple'); 
const bodyParser = require('koa-bodyparser');
const static=  require('koa-static');

const app = new Koa();
const router = new Router()
const sercet = 'jw';
const crypto = require('crypto');
const jwt1  = {
    sign(content){
        return crypto.createHmac('sha256',sercet).update(content).digest('base64').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    },
    toBase64Url(content,sercet){
        // 将内容转化成base64
        return Buffer.from(JSON.stringify(content)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    },
    encode(payload,sercet){
        let header = { typ: 'JWT', alg: 'HS256' }
        header = this.toBase64Url(header,sercet);
        const content = this.toBase64Url(payload,sercet);
        const sign = this.sign(header+'.'+content);
        return header+'.'+content+'.'+sign
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    // decode   (header + . + content)
}
jwt.encode({username:'123'},sercet)

router.post('/login',async(ctx)=>{
    let {username,password} = ctx.request.body;
    //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjEyMyJ9.1iPot4IPmnuWYa2pt1/HgQD00GJkJWrkxIHgsFzn33k=
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjEyMyJ9.1iPot4IPmnuWYa2pt1_HgQD00GJkJWrkxIHgsFzn33k
    ctx.body =  jwt1.encode({username},sercet)
})
router.get('/validate',async(ctx)=>{
    let {username,password} = ctx.request.body;
    let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjEyMyJ9.1iPot4IPmnuWYa2pt1_HgQD00GJkJWrkxIHgsFzn33k1`;
    try{
        // 如果签名ok 说明用户有权限 一般放置用户的唯一标识 _id
        let r =  jwt.decode(token,sercet);
        ctx.body = r
    }catch(e){
        console.log(e)
    }   
   
    console.log(r);
})


app.use(bodyParser());
app.use(static(__dirname));
app.use(router.routes());
app.listen(3000);