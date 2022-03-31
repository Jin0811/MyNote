# Vue项目当中设置scss全局变量

第一步：添加variable.scss文件，编写scss变量
```scss
// src/assets/style/variable.scss
$bg: #333;
$color: #ffd04b;
```

第二步：添加vue.config.js文件，添加以下配置项
```js
// vue.config.js
module.exports = {
  // CSS相关配置
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/variable.scss";`
      },
    }
  },
}
```

第三步：在组件当中使用
```scss
.my-header{
  width: 100%;
  height: 60px;
  background-color: $bg;
  color: $color;
}
```