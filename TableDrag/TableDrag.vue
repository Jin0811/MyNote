<template>
	<div class="table-drag-demo">
    <!-- 按钮 -->
    <div class="top-btns">
      <el-button type="primary" size="medium" @click="startDrag">开启拖拽</el-button>
      <el-button type="primary" size="medium" @click="endDrag">关闭拖拽</el-button>
    </div>
		
    <!-- 表格 -->
    <el-table :data="tableData" border row-key="id">
      <el-table-column prop="id" align="center" label="ID" width="55"></el-table-column>
      <el-table-column prop="name" align="center" label="名称"></el-table-column>
      <el-table-column prop="age" align="center" label="主页地址"></el-table-column>
    </el-table>
	</div>
</template>

<script>
  // 表格拖拽排序组件
	import Sortable from 'sortablejs';
	export default {
		name: 'TableDrag',
		data() {
			return {
				tableData: [], // 表格数据
        sortable: {} // Sortable实例
			}
		},
    created() {
      // mock数据
      let arr = [];
      for(let i=0; i<5; i++){
        arr.push({
          id: i,
          name: `学生 - ${i}`,
          age: i + 10,
        });
      }
      this.tableData = arr;
    },
		mounted() {
      this.initSort(); // 组件挂载，初始化Sortable
		},
		methods: {
      // 初始化拖拽
      initSort(){
        let tbody = document.querySelector('.el-table__body-wrapper tbody');
        let _this = this;
        this.sortable = Sortable.create(tbody, {
          disabled: true, // 设置为true，默认不允许拖拽，设置为false的时候，就是默认开启拖拽
          onEnd({newIndex, oldIndex}){
            const currRow = _this.tableData.splice(oldIndex, 1)[0];
            _this.tableData.splice(newIndex, 0, currRow)
          }
        });
      },
      // 开始拖拽
      startDrag(){
        // let state = this.sortable.option("disabled"); // 获取是否禁止拖拽，true为禁止，false为启用
				this.sortable.option("disabled", false);
      },
      // 关闭拖拽
      endDrag(){
        this.sortable.option("disabled", true);
      }
		}
	}
</script>

<style lang="scss" scoped>
  .table-drag-demo{
    padding: 15px;
    .top-btns{
      margin-bottom: 15px;
    }
  }
</style>
