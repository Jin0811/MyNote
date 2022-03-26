# Vue项目当中使用PDF.js预览PDF文件

## 第一步：放入静态资源
把static整个文件夹，放在项目根目录下的public文件夹内

## 第二步：使用
```js
let url = ''; // pdf文件的路径（例如：http://www.test.com/public/test.pdf）
let previewUrl = './static/pdf/web/viewer.html?file=' + encodeURIComponent(url);
window.open(previewUrl); // 打开一个新的页签进行预览（也可以使用iframe）
```