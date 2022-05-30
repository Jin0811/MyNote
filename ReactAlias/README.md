# React 项目当中配置 alias

## 1 说明
在Vue项目当中，我们知道可以使用 `@` 来表示 `src/`, 但是在React项目当中，却没有这个功能，但是我们可以进行手动的配置来实现此功能。

再比如，我们开发了一些公共的hooks，如果每个页面都使用路径的方式进行引入，这样很麻烦，效率很低，这个时候我们可以配置一个别名，来直接使用别名引入。

## 2 普通react项目配置别名
```js
// 第一步：释放React项目的配置文件，如果已经释放，则省略此步
// 注意：这里也可以不用释放，安装某些库来实现部分修改配置，看个人需要
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

## 3 TS + React项目配置别名
```js
// 第一步：释放React项目的配置文件，如果已经释放，则省略此步
// 注意：这里也可以不用释放，安装某些库来实现部分修改配置，看个人需要
npm run eject

// 第二步：找到 webpack.config.js 文件
// 找到resolve下的alias配置项，添加以下配置：
resolve: {
  alias: {
    // 自定义的别名，这里配置了四个别名
    "@": paths.appSrc,
    "interface": path.resolve(paths.appSrc, "interface"),
    "api": path.resolve(paths.appSrc, "api"),
    "utils": path.resolve(paths.appSrc, "utils"),

    // ....其他的一些配置
  }
}

// 第三步：在项目根路径下创建：paths.json 文件，内容如下所示：
// baseUrl设置为 ./ 也就是设置为了基于 tsconfig.json 的 ./
// paths当中的配置，都是基于baseUrl的
// "api/*": ["src/api/*"]
// 代表遇到 import {} from "api/*" 时
// 就从 src/api/* 中引入
// 这里的规则可以参考TS的文档：https://www.tslang.cn/docs/handbook/module-resolution.html
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "interface": ["src/interface"],
      "api/*": ["src/api/*"],
      "utils/*": ["src/utils/*"]
    }
  }
}

// 第四步：在项目根路径下的 tsconfig.json 当中添加以下代码：
// 即往compilerOptions当中添加："extends": "./paths.json"
{
  "compilerOptions": {
    "extends": "./paths.json"
  }
}

// 第五步：创建以下目录和文件
// src/api/rights.ts
// src/utils/menuUtils.ts
// src/interface/index.ts

// 第六步：使用
// 注意：（getMenuList、filterMenuForRender、menuItemInterface是对应文件当中导出的内容，这里就是根据个人情况进行导出）
import { getMenuList } from "api/rights";
import { filterMenuForRender } from "utils/menuUtils";
import { menuItemInterface } from "interface";
```