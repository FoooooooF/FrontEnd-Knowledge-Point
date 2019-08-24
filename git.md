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
一次关于rebase的测试,新建rebase分支,并在rabase分支下对文件进行修改
```bash
    git checkout -b rebase #Switched to a new branch 'rebase'
```