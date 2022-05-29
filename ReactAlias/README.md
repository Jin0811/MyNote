# React 项目当中配置 alias

## 1 说明
在Vue项目当中，我们知道可以使用 `@` 来表示 `src/`, 但是在React项目当中，却没有这个功能，但是我们可以进行手动的配置来实现此功能。

再比如，我们开发了一些公共的hooks，如果每个页面都使用路径的方式进行引入，这样很麻烦，效率很低，这个时候我们可以配置一个别名，来直接使用别名引入。

## 2 配置
```js
// 第一步：释放React项目的配置文件，如果已经释放，则省略此步
npm run eject

// 第二步：找到 webpack.config.js 文件
// 找到resolve下的alias配置项，添加以下两行配置：
resolve: {
  alias: {
    // 自定义的别名
    "@": paths.appSrc,
    "HOOkS": path.resolve(paths.appSrc, "hooks/index"),
    // ....其他的一些配置
  }
}

// 第三步：创建相关测试文件
// 在src目录下，创建一个hooks目录，里面创建一个index.js
// index.js当中，分别暴露两个函数：
// export function test1(){ console.log(111); }
// export function test2(){ console.log(222); }

// 第四步：启动项目并使用
// 以下两种导入方式都可以成功进行导入
import { test1, test2 } from "@/hooks/index";
import { test1, test2 } from "HOOkS";

test1();
test2();
```