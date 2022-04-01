# Vue自定义全局指令、按钮权限控制

## 1 介绍
通过创建一个自定义的指令，通过一些标识（如：用户类型、流程状态等）来对按钮进行显示和隐藏，即按钮的权限控制

这里只是实现了按钮权限的自定义指令，如果还想注册其他的全局自定义指令，也可以写在 `directives.js` 文件内

## 2 使用方法
- 第一步：把当前目录下的 directives 文件夹放到 src 目录下

- 第二步：在 `src/main.js` 当添加以下代码

  ```js
  // 注册全局指令
  import directives from "@/directives/directives.js";
  Vue.use(directives);
  ```

- 第三步：根据项目的实际情况，修改 `@/directives/directives.js` 的代码

- 第四步：使用

  ```html
  <el-button v-auth="1">新增</el-button>
  <el-button v-auth="2">审核</el-button>
  ```