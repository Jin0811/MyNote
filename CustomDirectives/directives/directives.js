export default Vue => {
  /**
   * @description 按钮权限控制
   * @example <el-button v-auth="1">新增</el-button> 只有当前登录的用户类型为1时，才显示新增按钮
   * @example <el-button v-auth="2">审核</el-button> 只有当前登录的用户类型为2时，才显示审核按钮
   */
  Vue.directive("auth", {
    inserted: function(el, binding) {
      // 这里的userType是从localStorage当中获取的，真实项目当中，可能是从vuex当中获取的一个值或者是一个按钮权限数组
      let userType = localStorage.getItem("userType");
      if (binding.value && userType !== binding.value) {
        el.parentNode.removeChild(el);
      }
    }
  });

  // 下方可以继续添加全局的自定义指令，在这里的定义的指令，全局都可以使用
};