const redis = require('redis'); // 导入redis包

// 相关配置项
const port = ""; // 端口号  
const host = ""; // 服务器IP
const password = ""; // 密码

// 创建连接
client = redis.createClient({
  port, // 端口号
  host, // 服务器IP
  no_ready_check: true, 
});

// 验证连接
client.auth(password, function (err, data) {
  if(err){
    console.log('验证失败');
  }else{
    console.log('通过认证');
  }
});

client.on('connect', function () {
  console.log('redis连接成功');
});

client.on('ready', function (err) {
  console.log('redis准备成功');
});

module.exports = client;


/**
 * 使用redis
 * const client = require("./redis.js");
 * client.set("token", "123456789");
 */