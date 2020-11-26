//webpack 模块化原理 
(function(modules){     
    //加载过的模组     
    let installedModules={};     
    //模组加载方法
         function _require(moduleId){         if(installedModules[moduleId]){             return  installedModules[moduleId];         }         let module=installedModules[moduleId]={             exports:{},             id:moduleId,             laoded:false         }         
         //模组调用,并递归的require         
         modules[moduleId].call(module.exports,module,module.exports,_require);         module.loaded=true;         return module.exports;     }     return _require(0); })([     function (module,exports,require){         let obj=require(1) ;        console.log(obj)     },     function (module,exports,require){         let name="fooooooof";         exports.name=name;     } ])