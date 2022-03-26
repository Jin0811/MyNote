// 实际项目当中，这个配置项可能是登录成功之后后端返回的，存在了vuex当中，可根据实际情况，进行调整
export default [
  {
    path: "/router1", // 路由规则
    title: "一级菜单 1", // 菜单文字
    children: [
      {
        path: "/router1/router11",
        title: "二级菜单 1-1",
        children: [
          {
            path: "/router1/router11/router111",
            title: "三级菜单 1-1-1",
          }
        ]
      },
      {
        path: "/router1/router12",
        title: "二级菜单 1-2",
      }
    ]
  },
  {
    path: "/router2",
    title: "一级菜单 2",
    children: [
      {
        path: "/router2/router21",
        title: "二级菜单 2-1",
      },
      {
        path: "/router2/router22",
        title: "二级菜单 2-2",
      }
    ]
  }
]