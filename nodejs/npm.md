使用webpack 开发npm包 从入门到入坑
问题来源
前段时间去帮朋友的公司，重构一个前端项目，大致把原项目浏览了一遍，然后就风风火火的开干了，框架选型用了最流行的React+Reflux，然而第一个首页就遇到个问题，源项目有一个fullpage组件开发的全屏切换，却不被React支持。然后就去Github上去找，结果没找到一个好用的，然后就想，我是否能自己开发一个呢。

准备工具
安装nodeJS

注册一个github账户用于托管代码

注册一个npm账户

开发你的module，更新至github

发布module至npm

安装nodeJS
https://nodejs.org/en

根据系统安装对应的版本，安装完后对应的npm也会被安装进去进入终端，输入命令查询安装版本！

$ node -v
$ npm -v
github创建项目
https://github.com 注册账户，新建项目，然后clone到本地。

终端进入到项目文件夹，执行npm init命令，构建模块的描述文件，系统会提示你输入所需的信息，不想输入就直接Enter跳过。这里主要的几个配置如下

name就是你要发布的module名；

version版本信息（每发布一次版本号都必须大于上一次发布的版本号）；

entry入口文件。

剩下的就是开发啦

$ npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (node) easy_mongo
version: (0.0.0) 0.1.0
description: An easy mongodb client for node.js based on native mongodb driver.
entry point: (index.js) 
test command: make test
git repository: https://github.com/JeremyWei/easy_mongo.git
keywords: Mongodb node easy 
author: JeremyWei
license: (BSD-2-Clause) MIT
npm注册
输入完用户名，密码，邮箱后没有错误信息就完成了。

$ npm adduser
Username: your name
Password: your password
Email: (this IS public) your email
查询或者登陆别的用户命令

$ npm whoami
$ npm login
npm module 发布
module开发完毕后，剩下的就是发布啦，进入项目根目录，输入命令。

$ npm publish
这里有时候会遇到几个问题,问题1：

npm ERR! no_perms Private mode enable, only admin can publish this module:
这里注意的是因为国内网络问题，许多小伙伴把npm的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。

npm config set registry=http://registry.npmjs.org
问题2：

npm ERR! you do not have permission to publish "your module name". Are you logged in as the correct user?
提示没有权限，其实就是你的module名在npm上已经被占用啦，这时候你就去需要去npm搜索你的模块名称，如果搜索不到，就可以用，并且把package.json里的name修改过来，重新npm publish，看到如下信息就表示安装完成了，rc-fullpage就是我的模块名。

+ rc-fullpage@0.1.0
更新版本，发布

$ npm version 0.1.1
$ npm publish
版本号规范
npm社区版本号规则采用的是semver（语义化版本），主要规则版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

主版本号：当你做了不兼容的 API 修改，

次版本号：当你做了向下兼容的功能性新增，

修订号：当你做了向下兼容的问题修正。

先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

持续集成
目前npm上开源的项目实在是太多，从中找出靠谱的项目要花费一定的精力跟时间去验证，所以开发者都会对自己的开源项目持续更新，并且经过测试的项目更加值得信赖。对于刚上线并且github上star星数很少的项目，使用者都会怀疑，这个项目靠谱不？所以这时候你需要告诉他，老子靠谱，怎么做？持续集成。

目前Github已经整合了持续集成服务travis，我们只需要在项目中添加.travis.yml文件，在下一次push之后，travis就会定时执行npm test来测试你的项目，并且会在测试失败的时候通知到你，你也可以把项目当前的状态显示在README.md中，让人一目了然，比如React里的

图片描述

.travis.yml 是一个YAML文件，具体的相关的配置见This，例子如下：

language: node_js
node_js:
  - "6"
  - "6.1"
  - "5.11"
services:
  - mongodb
这个例子的是让travis在node.js的0.6.x，0.6.1，0.5.11三个版本下对项目进行测试，并且需要mongodb的服务。

End
至此你的第一个module就开发并发布完成啦。

rc-fullpage 这是我前天化了一天时间开发的一个全屏的React组件，由于比较赶，功能不完善，只实现了简单的基础功能，接口还在后续开发中，单元测试没有，持续集成也木有。So，尽情的吐槽吧！

# 参考
1. [querystring2json](https://github.com/FoooooooF/querystring2json)
2. [发布自己的npm包](https://segmentfault.com/a/1190000006250554)
3. [从零开始教你写一个NPM包 :star:](https://segmentfault.com/a/1190000011095467)
4. [webpack官网->创建 library](https://www.webpackjs.com/guides/author-libraries/)