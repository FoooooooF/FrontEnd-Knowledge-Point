# 使用Node.js 修改文件

### 作为字符串进行切割，添加和拼接
```js
const fs = require('fs')

const data = fs.readFileSync('./temp.txt', 'utf8').split('\n')
data.splice(data.length - 2, 0, 'test')
fs.writeFileSync('./temp.txt', data.join('\n'), 'utf8')
```

# 参考
1. [修改文件](https://cnodejs.org/topic/51e00beef4963ade0e4e8268)
2. [node修改文件](https://segmentfault.com/q/1010000017406439)