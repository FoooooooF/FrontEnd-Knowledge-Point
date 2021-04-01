# vue自定义标签的v-model指令
## 问题
>在 vue2 中对表单控件有着良好的双向数据绑定机制，但是对于要特定实现某些功能的输入时，我们就不得不使用到 contenteditable="true" 的 div ，而在这个 div 上是使用 v-model 是没有效果的。那么问题就来了，输入是非常需要双向绑定的，这里的双向数据绑定该如何实现？
## 在组件上使用 v-model(来自[官网](https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model))
自定义事件也可以用于创建支持 v-model 的自定义输入组件。记住：
```html
<input v-model="searchText">
```
等价于：
```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```
当用在组件上时，v-model 则会这样：
```html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```
为了让它正常工作，这个组件内的 <input> 必须：

将其 value 特性绑定到一个名叫 value 的 prop 上
在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
写成代码之后是这样的：
```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```
现在 v-model 就应该可以在这个组件上完美地工作起来了：
```html
<custom-input v-model="searchText"></custom-input>
```

### 解决方案
单独声明一个组件，在组件内部处理数据（也就是innerHTML），并将数据返回给父组件。
代码如下：
```html
<template>
    <div contenteditable="true"
         v-html="innerText"
         @input="changeText"></div>
</template>
<script>
    export default {
        props: ['value'],
        data(){
            return {innerText:this.value}
        },
        methods:{
            changeText(){
                this.innerText = this.$el.innerHTML;
                this.$emit('input',this.innerText);
            }
        }
    }
</script>
```
然后在父组件中直接使用 v-model 就可以了（这里我把组件名称定义成了 v-edit-div）。
```html
<template>
    <div>
        <v-edit-div v-model='text'></v-edit-div>
        <span>{{text}}</span>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                text:'改一下试一试',
            }
        }
    }
</script>
```
至于为什么可以直接用 v-model ,看官网的 API 吧。
v-model 传送门 使用自定义事件的表单输入组件，那一章节。

这个例子其实会有不少的问题，包括如何实现异步数据的刷新，更新值之后光标定位的问题等等，在考虑了异步数据和光标问题后，有了以下的这个版本
```html
<template>
    <div class="edit-div"
         v-html="innerText"
         :contenteditable="canEdit"
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText">
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        watch: {
            'value'(){
                if (!this.isLocked && !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .edit-div {
        width: 100%;
        height: 100%;
        overflow: auto;
        word-break: break-all;
        outline: none;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
        &[contenteditable=true]{
            user-modify: read-write-plaintext-only;
            &:empty:before {
                content: attr(placeholder);
                display: block;
                color: #ccc;
            }
        }
    }
</style>
```
这个版本是在项目中最终使用的版本，需要用的直接拿走用即可。
注：

canEdit 标志这个div是否是可编辑的，在父组件直接使用 v-model 即可。
该组件应该是一个div元素（也不一定非要是div）的子元素，父元素的大小即为子元素的大小。
# reference
1. [Vue 2.0 入门系列（11）双向绑定其他元素以及自定义表单控件 :star:](https://segmentfault.com/a/1190000009225098)
2. [vue2 实现 div contenteditable="true" 类似于 v-model 的效果](https://segmentfault.com/a/1190000008261449)
3. [vue document - 在组件上使用 v-model](https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)