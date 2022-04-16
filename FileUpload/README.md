# JavaScript文件上传

## 1 说明
client为前端页面，server为文件上传的Node服务，主要涉及到了以下几种文件上传：

- 单一文件上传「FORM-DATA」
- 单一文件上传「BASE64」，只适合图片
- 单一文件上传「会显示缩略图」
- 单一文件上传「进度管控」
- 多文件上传
- 拖拽上传
- 大文件切片上传


## 2 注意

1、server即Node服务，需要先安装相关依赖
```js
// 安装依赖
cd server
npm install

// 启动Node服务
node server.js
```

2、如果使用的是 `Open with Live Server` 打开 `/client/index.html`，则会出现跨域问题，造成切片上传失败，可以使用 `Open In Default Browser` 来打开此文件。