const http = require('http');

const languages = {
    en:{
        message:'hello'
    },
    zh:{
        message:'你好'
    },
    jp:{
        message:'おはようございます'
    }
}
const defaultLanguage = 'zh';
http.createServer((req,res)=>{
    let language = req.headers['accept-language'];
    console.log(language)
    if(language){ // jp,en;q=0.8
        // [{lan:zh-cn,q:1},{lan:zh,q:0.9}];
        let lans = language.split(',').map(lan=>{
            let [l,q="q=1"] = lan.split(';');
            return {
                lan:l,
                q:q.split('=')[1]
            }
        }).sort((a,b)=>b.q-a.q)
        for(let i = 0 ;i <lans.length;i++){
            let current = lans[i].lan; // 获取的是当前支持的某种语言
            if(languages[current]){
                return res.end(languages[current].message)
            }
        }
        let r = languages[defaultLanguage].message;
        res.end(r);
    }else{
        let r = languages[defaultLanguage].message;
        res.end(r);
    }
}).listen(3000);