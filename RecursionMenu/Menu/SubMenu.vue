<template>
  <el-submenu :index="menuItem.path">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span>{{ menuItem.title }}</span>
    </template>
    <template v-for="(item, index) in menuItem.children">
      <template v-if="item.children && item.children.length > 0">
        <SubMenu :menuItem="item" :key="index"></SubMenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path" :key="index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "SubMenu",
  props: {
    menuItem: {
      type: Object,
      require: true
    }
  },
};
</script>
