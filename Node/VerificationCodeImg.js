/**
 * Node生成图片验证码
 * 运行本文件，需要安装：express、gd-bmp两个依赖
 * 
 * 初始化package.json并且安装相关依赖：
 * npm init -y
 * npm install express gd-bmp
 * 
 * 依赖安装完成之后，启动项目，访问：http://127.0.0.1:3000 就可以看到生成的图片验证码
 * 
 * 相关文档（自定义的rand函数在下方）
 * 绘制圆形：img.drawCircle(rand(0, 100), rand(0, 40), rand(10 , 40), rand(0, 0xffffff))
 * 绘制矩形：img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff))
 * 绘制线条：img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff))
 */

const express = require("express");
const app = express();
const BMP24 = require('gd-bmp').BMP24;

// 定义一个Api，访问此Api就可以看到图片验证码
app.get("/", function(req, res){
  const img = generateImg();
  res.setHeader('Content-Type', 'image/png');
  res.end(img.getFileData());
});

// 启动项目，监听3000端口
app.listen(3000, function(){
  console.log("app is running at http://127.0.0.1:3000");
});



// 生成随机数字
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 生成图片验证码
function generateImg(){
  const img = new BMP24(100, 40); // 创建长100， 宽40的画布
  img.fillRect(0, 0, 100, 40, 0xffffff); // 绘制一个铺满画布的矩形，设置背景颜色

  // 绘制线条（左上到右下、左下到右上）
  img.drawLine(rand(0, 10), rand(0, 20), rand(90, 100), rand(20, 40), rand(0, 0xffffff));
  img.drawLine(rand(0, 10), rand(20, 40), rand(90, 100), rand(0, 20), rand(0, 0xffffff));

  // 绘制背景小圆点
  for(let i=0; i<80; i++){
    img.drawPoint(rand(0, 100), rand(0, 40), 0x9e9e9e);
  }

  // 生成验证码的文本，将随机获取其中4个字符
  const word = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz123456789";
  let str = "";
  for (let i = 0; i < 4; i++) {
    str = str + word[rand(0, word.length - 1)];
  }

  // 将生成的文本，画到画布上，字体从三种字体当中随机获取一种
  let fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32]; // 内置的三种规格的字体
  for (let n = 0; n < 4; n++) {
    img.drawChar(str[n], 20 + n * 16, rand(0, 10), fonts[rand(0, 2)], 0x616161);
  }
  // 返回生成好的图片验证码
  return img;
}