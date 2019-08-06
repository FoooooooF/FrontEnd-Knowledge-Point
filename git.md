Git 常用操作
===============
根据4种常用的场景的，简易的命令行入门教程:
## 1. Git 全局设置:
```bash
    git config --global user.name "youtname"
    git config --global user.email "youremeil"
```
## 2. 本地创建仓库并连接远程仓库
```bash
mkdir app
cd app
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://git.youradress.git
git push -u origin master
```

## 3. 本地已有仓库连接远程仓库
```bash
cd existing_git_repo
git remote add origin https://git.youradress.git
git push -u origin master
```

## 4. 本地没有仓库 直接clone远程仓库到本地
```bash
    git clone https://git.youradress.git
```