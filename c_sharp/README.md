# C Sharp 学习笔记

## C#，.NET和ASP.NET的关系和区别
 

### 1、.net(dot net)

.net是一个平台，抽象的平台概念。

实现形式是库：①定义了基本的类型(通用类型系统CTS，common type system)。②包含.net公共语言运行库(CLK，common language runtime，负责管理用.net库开发的所有应用程序的运行)。

核心是.net framework

NET Framework包括两个关键组成元素：

a.Common Language Runtime，公共语言运行时（CLR）-提供内在管理，代码安全性检测等功能。

b..NET Framework Class Library，.NET框架类库（FLC）-提供大量应用类库，提高开发效率　。

 

### 2、C#(C sharp)

C#是一个程序设计语言，仅仅是一个语言，是运行在.net CLR上的，用于创建应用程序的高级语言。

### 3、ASP.NET是一个网站开发的技术，仅仅是.NET框架中的一个应用模型。　　

ASP.NET 是用于生成基于Web的应用程序的内容丰富的编程框架。

## 概念理解(个人理解)：
- 泛型：类，接口，定义的是时候，并不知道实例化（new）的时候传入得参数是什么类型的，于是给一个<T>泛型；你想什么类型就是什么类型；  
  例如List， `new List<string>` `new List<int>`
- 
  





## 参考
1. [微软C# .net指南](https://docs.microsoft.com/en-us/dotnet/csharp/)
2. [微软 .net指南](https://docs.microsoft.com/zh-cn/dotnet/)

3. [微软C# .net指南 中文版](https://docs.microsoft.com/zh-cn/dotnet/csharp/)
4. [ASP.NET Overview](https://docs.microsoft.com/zh-cn/aspnet/overview)
5. [ASP.NET 框架](https://docs.microsoft.com/zh-cn/aspnet/web-forms/overview/getting-started/getting-started-with-aspnet-45-web-forms/create-the-project)
6. [简析.NET Core 以及与 .NET Framework的关系(无图)](https://www.cnblogs.com/vipyoumay/p/5603928.html)
7. [Introducing .NET Core](https://devblogs.microsoft.com/dotnet/introducing-net-core/)