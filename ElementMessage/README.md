# ElementUI的消息组件二次封装

## 使用说明

- 第一步首先将当前目录下的 message.js 当到 src/utils 文件夹内

- 第二步：在 main.js 当中添加以下代码

  ```js
  // 对elementUI的消息组件进行封装
  import message from '@/utils/message.js';
  Vue.prototype.$message = message;
  ```

- 第三步：在组件当中使用

  ```js
  // msg 必选，要显示的消息
  // dur 可选，消息显示的时间，毫秒，默认为3000

  this.$message.success("成功", 1000) // 成功的消息
  this.$message.error("失败") // 失败的消息
  this.$message.warning("警告") // 警告的消息
  this.$message.info("一般消息") // 一般消息
  ```