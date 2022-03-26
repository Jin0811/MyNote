const fs = require('fs');
const express = require('express');
const formidable = require('formidable');
const path = require('path');

// 创建express实例
const app = express();

// 解决跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post('/api/upload', (req, res, next) => {
  // 创建并配置form
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8'; // 编码
  form.keepExtensions = true; // 保留扩展名
  form.maxFileSize = 10 * 1024 * 1024; // 设置最大可以接受的文件大小，这里为10M
  form.uploadDir = path.join(__dirname, './upload'); // 文件存储路径

  /**
   * 解析 formData 数据
   * err      解析失败的信息
   * fileds   上传时附带的额外参数
   * files    上传的文件
   * 
   * form.parse的第二个参数是一个回调函数，上传了几个文件，就会执行几次
   * 即每一个文件都会执行一次
   */
  form.parse(req, (err, fileds, files) => {
    if(err) return next(err)
    let oldPath = files.file.path; // 获取文件路径
    let name = files.file.name; // 前台上传时的文件名 也就是文件原本的名字
    let newPath = path.join(path.dirname(oldPath), name);
    fs.rename(oldPath, newPath, (err) => {
      if(err) return next(err)
    });
    res.json({
      success: true,
      fileName: name,
      fileSize: files.file.size,
    });
  });
});

app.listen(3000, () => {
  console.log("App is running at 127.0.0.1:3000");
});