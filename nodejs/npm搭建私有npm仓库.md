# 搭建私有npm仓库
## 可行方案
> 使用 git+ssh 这种方式直接引用到 GitHub 项目地址 搭建npm私有仓库
> 
> 通过git安装npm私有模块

需求分析
在日常项目中，会有几个项目共同的组件或者工具函数库。这些代码如果在各个项目中都copy一份的话，如果有需要改动的话，oh，要累死去。
本着DPR的原则，需要一种可以管理公用代码的方法。并且代码中有些是公司内部业务逻辑，这肯定不能发布成公用包。所以需要一种私有包管理方案。

可选方案
1、npm官方私有包，需要收费，pass

2、搭建npm私有服务器，还没有这个必要，pass

3、使用 npm 安装 git 仓库 简单便利

4、使用 git 的 submodule，在主仓库中嵌套子仓库

npm 安装 git 仓库
因为github私有仓库需要收费，这里我使用码云创建免费私有 git 仓库。
在项目中直接 npm 安装私有仓库，示例：

npm install git+ssh://git@github.com:ltinyho/test.git
可以使用npm install --help查看install命令(npm@5.3.0)
```
 npm install (with no args, in package dir)
 npm install [<@scope>/]<pkg>
 npm install [<@scope>/]<pkg>@<tag>
 npm install [<@scope>/]<pkg>@<version>
 npm install [<@scope>/]<pkg>@<version range>
 npm install <folder>
 npm install <tarball file>
 npm install <tarball url>
 npm install <git:// url>
 npm install <github username>/<github project>
```
从git安装可以选择标签|分支|commit，最好更该代码后修改仓库中package.json版本信息

```
npm install <github username>/<github project>#<tag|branch|commit>
```
git submodule 仓库嵌套
git submodule add <仓库地址> <文件路径>
在项目根目录生成`.gitmodules`文件，记录子模块的信息
新项目安装或者更新

```
git submodule init 
git submodule update 
```

## 参考
1. [搭建私有npm仓库](https://zhuanlan.zhihu.com/p/35773211)
2. [通过git安装npm私有模块](https://segmentfault.com/a/1190000011138967)