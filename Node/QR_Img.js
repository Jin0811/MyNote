/**
 * Node根据文本生成二维码
 * 运行本文件，需要安装：express、qr-image两个依赖
 * 
 * 初始化package.json并且安装相关依赖：
 * npm init -y
 * npm install express qr-image
 * 
 * 依赖安装完成之后，启动项目，访问：http://127.0.0.1:3000 就可以看到生成的二维码
 */

const express = require("express");
const app = express();
const QR = require('qr-image');
const fs = require('fs');

app.get("/", function (req, res) {
  // 生成二维码
  const content = "二维码的信息";
  const QR_Img = QR.image(content, {
    type: 'png',
    margin: 2
  });

  // 保存到当前目录
  // QR_Img.pipe(fs.createWriteStream('test.png'));
  // res.end();

  // 返回到接口调用方
  res.setHeader('Content-type', 'image/png');
  QR_Img.pipe(res);
});

app.listen(3000, function () {
  console.log("app is running at http://127.0.0.1:3000");
});