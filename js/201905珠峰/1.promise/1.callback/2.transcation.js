class Transaction{
    perform(anyMethod,wrappers){
        wrappers.forEach(wraper=>wraper.initialize())
        anyMethod();
        wrappers.forEach(wraper=>wraper.close())
    }
}
let transaction = new Transaction();
let oldFunc = ()=>{
    console.log('原有的逻辑')
}
transaction.perform(oldFunc,[{ // warpper
    initialize(){
        console.log('初始化1')
    },  
    close(){
        console.log('关闭1')
    }
},{ // warpper
    initialize(){
        console.log('初始化2')
    },  
    close(){
        console.log('关闭2')
    }
}]);
