# 从零开发一个npm小工具
> 使用webpack 开发打包上线自己的npm包，其中包含了代码开发/测试/管理，npm账号/包管理。
>
> 开发自己的一个小工具 `querystring2json`

 项目的GitHub地址,欢迎:star: [querystring2json](https://github.com/FoooooooF/querystring2json)

## 流程
1. 安装nodeJS
2. 注册一个github账户用于托管代码
3. 注册一个npm账户
4. 开发你的module，更新至github
5. 发布module至npm

## 开发环境配置
安装开发依赖
```json
"devDependencies": {
  "babel-core": "^6.26.3",
  "babel-jest": "^24.9.0",
  "babel-loader": "^8.0.6",
  "babel-preset-env": "^1.7.0",
  "jest": "^24.9.0",
  "regenerator-runtime": "^0.13.3",
  "webpack": "^4.31.0",
  "webpack-cli": "^3.3.2"
}
```


##  npm 包管理
安装nodeJS
https://nodejs.org/en

根据系统安装对应的版本，安装完后对应的npm也会被安装进去进入终端，输入命令查询安装版本！

```bash
$ node -v
$ npm -v
```
github创建项目
https://github.com 注册账户，新建项目，然后clone到本地。

终端进入到项目文件夹，执行npm init命令，构建模块的描述文件，系统会提示你输入所需的信息，不想输入就直接Enter跳过。这里主要的几个配置如下

- name就是你要发布的module名；

- version版本信息（每发布一次版本号都必须大于上一次发布的版本号）；

- entry入口文件。

剩下的就是开发啦
```bash
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
```
### npm注册
输入完用户名，密码，邮箱后没有错误信息就完成了。
```
$ npm adduser
Username: your name
Password: your password
Email: (this IS public) your email
```
查询或者登陆别的用户命令
```
$ npm whoami
$ npm login
```
###  npm module 发布
module开发完毕后，剩下的就是发布啦，进入项目根目录，输入命令。
```
$ npm publish
```
这里有时候会遇到几个问题,问题1：
```
npm ERR! no_perms Private mode enable, only admin can publish this module:
```
这里注意的是因为国内网络问题，许多小伙伴把npm的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。
```
npm config set registry=http://registry.npmjs.org
```
问题2：
```
npm ERR! you do not have permission to publish "your module name". Are you logged in as the correct user?
```
提示没有权限，其实就是你的module名在npm上已经被占用啦，这时候你就去需要去npm搜索你的模块名称，如果搜索不到，就可以用，并且把package.json里的name修改过来，重新npm publish。

更新版本，发布
```
$ npm version 0.1.1
$ npm publish
```
#### 版本号规范
npm社区版本号规则采用的是semver（语义化版本），主要规则版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

- 主版本号：当你做了不兼容的 API 修改，
- 次版本号：当你做了向下兼容的功能性新增，
- 修订号：当你做了向下兼容的问题修正。

先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。
## 测试
使用jest进行测试
```
npm install -D jest babel-jest babel-core babel-preset-env regenerator-runtime
```
### 编写你的第一个Jest测试
创建src和test目录及相关文件

- 在项目根目录下创建src目录，并在src目录下添加functions.js文件
- 在项目根目录下创建test目录，并在test目录下创建functions.test.js文件
Jest会自动找到项目中所有使用.spec.js或.test.js文件命名的测试文件并执行，通常我们在编写测试文件时遵循的命名规范：测试文件的文件名 = 被测试模块名 + .test.js，例如被测试模块为functions.js，那么对应的测试文件命名为functions.test.js。

## 持续集成
目前npm上开源的项目实在是太多，从中找出靠谱的项目要花费一定的精力跟时间去验证，所以开发者都会对自己的开源项目持续更新，并且经过测试的项目更加值得信赖。对于刚上线并且github上star星数很少的项目，使用者都会怀疑，这个项目靠谱不？所以这时候你需要告诉他，老子靠谱，怎么做？持续集成。

目前Github已经整合了持续集成服务travis，我们只需要在项目中添加.travis.yml文件，在下一次push之后，travis就会定时执行npm test来测试你的项目，并且会在测试失败的时候通知到你，你也可以把项目当前的状态显示在README.md中，让人一目了然，比如React里的

.travis.yml 是一个YAML文件，具体的相关的配置见This，例子如下：
```YAML
language: node_js
node_js:
  - "6"
  - "6.1"
  - "5.11"
```
这个例子的是让travis在node.js的0.6.x，0.6.1，0.5.11三个版本下对项目进行测试，并且需要mongodb的服务。

# 参考
1. [querystring2json](https://github.com/FoooooooF/querystring2json)
2. [发布自己的npm包](https://segmentfault.com/a/1190000006250554)
3. [从零开始教你写一个NPM包 :star:](https://segmentfault.com/a/1190000011095467)
4. [webpack官网->创建 library](https://www.webpackjs.com/guides/author-libraries/)
5. [使用Jest测试JavaScript (入门篇)](https://www.jianshu.com/p/70a4f026a0f1)
6. [持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
7. [npm package.json属性详解](https://www.cnblogs.com/tzyy/p/5193811.html#_h1_13)
8. [package.json 中的 Module 字段是干嘛的](https://segmentfault.com/a/1190000014286439)

