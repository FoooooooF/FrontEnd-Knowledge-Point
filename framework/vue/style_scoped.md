# vue css scoped 实现原理
vue scoped 使用css 属性选择器实现
scoped的实现原理
vue中的scoped属性的效果主要通过PostCSS转译实现，如下是转译前的vue代码：
```html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```
转译后：
```html
<style>
.example[data-v-5558831a] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-5558831a>hi</div>
</template>
```
即：PostCSS给一个组件中的所有dom添加了一个独一无二的动态属性，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom。

为什么需要穿透scoped？
scoped看起来很美，但是，在很多项目中，会出现这么一种情况，即：引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时只能通过特殊的方式，穿透scoped。
```html
<style scoped>
    外层 >>> 第三方组件内部 {
        样式
    }
</style>
```
通过 `>>>` 可以使得在使用scoped属性的情况下，穿透scoped，修改其他组件的值。但是注意vue-loader的版本要高于12.2.0 这个功能是这个版本后才具有的。
https://github.com/vuejs/vue-loader/releases/tag/v12.2.0