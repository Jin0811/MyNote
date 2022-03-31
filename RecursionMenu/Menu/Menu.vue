<template>
  <div class="menu-container">
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <template v-for="(item, index) in routerData">
        <template v-if="item.children && item.children.length>0">
          <SubMenu :menuItem="item" :key="index"></SubMenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="index">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// 菜单配置项，这里是静态的，实际项目当中根据项目情况来
import routerData from "./routerData";

import SubMenu from "./SubMenu";
export default {
  name: "Menu",
  components: {
    SubMenu
  },
  data(){
    return {
      routerData,
    }
  },
}
</script>

<style lang="scss" scoped>
  .menu-container{
    height: 100%;
    .el-menu{
      height: 100%;
    }
  }
</style>