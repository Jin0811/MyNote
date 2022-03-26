# Node文件上传功能

该功能依赖 `formidable` 库，需要先安装

另外实例当中使用了express框架，也需要安装，也可以使用其他框架，如Koa等

## 1 安装 `formidable`
```js
// 普通安装
npm install formidable

// 安装指定版本（建议安装此版本）
npm install formidable@1.2.2
```

## 2 使用

可以参考当前目录下的 `app.js` 文件

注意点：
- 需要在与 `app.js` 同级别的目录下创建一个 `upload` 文件夹，用于存放上传的文件
- 当前代码如果上传同名的文件，新上传的文件会覆盖已存在的文件，可以借助 `nanoid` 等库来生成一个唯一的字符串，作为文件名，来解决同名覆盖的问题

## 3 前端调用接口示例
```html
<template>
  <div>
    <el-upload :action="uploadUrl" :data="uploadData" multiple>
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data(){
    return {
      uploadUrl: 'http://127.0.0.1:3000/api/upload', // 上传文件的接口地址
      uploadData: {
        id: 1
      }, // 上传时附带的额外参数
    }
  },
}
</script>
```