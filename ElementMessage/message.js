/**
 * 对elementUI的Message组件进行封装
 * 
 * 调用方式：
 * this.$message.success(msg, dur) 成功的消息
 * this.$message.error(msg, dur) 失败的消息
 * this.$message.warning(msg, dur) 警告的消息
 * this.$message.info(msg, dur) 一般消息
 * 
 * 参数：
 * @param msg 必选，要显示的消息
 * @param dur 可选，消息显示的时间，毫秒，默认为3000
 */

import { Message } from 'element-ui';
let message = {
  // 成功
  success: (msg, dur) => {
    Message({
      type: 'success',
      message: msg,
      duration: dur ? dur : 3000 // 默认3000毫秒后关闭，如果有参数，使用参数
    });
  },
  // 失败
  error: (msg, dur) => {
    Message({
      type: 'error',
      message: msg,
      duration: dur ? dur : 3000 // 默认3000毫秒后关闭，如果有参数，使用参数
    });
  },
  // 警告
  warning: (msg, dur) => {
    Message({
      type: 'warning',
      message: msg,
      duration: dur ? dur : 3000 // 默认3000毫秒后关闭，如果有参数，使用参数
    });
  },
  // 一般信息
  info: (msg, dur) => {
    Message({
      type: 'info',
      message: msg,
      duration: dur ? dur : 3000 // 默认3000毫秒后关闭，如果有参数，使用参数
    });
  }
}

export default message