Git 常用操作
===============
根据4种常用的场景的，简易的命令行入门教程:
## 1. Git 全局设置:
```bash
    git config --global user.name "youtname"
    git config --global user.email "youremeil"
    git config --lsit  #查看配置信息
```
## 2. 本地创建仓库并连接远程仓库
```bash
    mkdir app   #创建app文件夹
    cd app      #进入app文件夹
    git init    #git仓库初始化
    touch README.md    #创建readme.md文件
    git add README.md  #本地仓库添加 readme.md
    git commit -m "first commit"  #本地仓库提交修改
    git remote add origin https://git.youradress.git # 设置远程仓库地址
    git push -u origin master # 推送本地分支 到远程的master分支  并将当前分支与远程master分支进行绑定 -u
```

## 3. 本地已有仓库连接远程仓库
```bash
    cd existing_git_repo  #进入本地项目目录
    git remote add origin https://git.youradress.git # 设置远程仓库地址
    git push -u origin master # 推送本地分支 到远程的master分支
```

## 4. 本地没有仓库 直接clone远程仓库到本地
```bash
    git clone https://git.youradress.git # 克隆远程仓库到本地
```

## 5. 查看分支分析
```bash
    git branch   #查看所有本地分子
    git branch newbranch #创建新分支newbranch
    git branch -vv # 查看本地分支，对用的远程分支，最近的commit comment
```
## 5.切换分支
```bash
    git checkout filename # 撤销更改
    git checkout targetbranch # 由当前branch 切换到 targetbranch
    git checkout -b newbranch # 由当前branch 创建并切换到 newbranch
```

## 6.合并分支
```bash
    git merge targetbranch #将当前分支与targetbranch 分支进行合并
```

## rebase 变基
一次关于rebase的测试,新建rebase分支,并在rabase分支下对文件进行修改,进行提交
```bash
    git checkout -b rebase #Switched to a new branch 'rebase'
    git commit -m "rebase" #提交到stage
    git push  -u origin rebase # 提交到origin
```
在master 分支和rebase 分支上分别前进commit,然后在 rebase分支上操作
```
    git rebase master
```
然后我的rebase分支合并了master分支上的修改,但是我的master分支分支上,并没有rebase分支上的修改.
于是我不得不在master分支上进行了一次merge操作.


## 有效的git分支管理（拒绝混乱）

## 参考
1. [优雅的使用Git](https://www.zhihu.com/question/20866683/answer/720671116)
2. [.gitignore 规则写法](https://my.oschina.net/longyuan/blog/521098)
3. [Git忽略提交规则](https://www.cnblogs.com/kevingrace/p/5690241.html)
4. [图解git命令(动图) :star:](https://mp.weixin.qq.com/s/d0gxbpMmDfewD3tQfV1ZoQ)
5. [图解git命令(动图) 原英文版 :star:](https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1)