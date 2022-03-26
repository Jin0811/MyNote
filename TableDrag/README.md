# 表格行拖拽排序

拖拽排序的功能依赖于 `sortablejs` 库，需要先安装这个库

这边安装的是 1.12.0 版本的，可以正常使用

完整版的实例可以看当前目录下的 `TableDrag.vue`

## 1 安装 `sortablejs`
```js
// 普通安装
npm install sortablejs --save

// 安装指定版本（建议安装此版本）
npm install sortablejs@1.12.0 --save
```

## 2 使用 `sortablejs`
```js
// 引入 sortablejs
import Sortable from 'sortablejs';

// 在mounted钩子函数当中进行Sortable的初始化
mounted() {
  this.initSort(); // 组件挂载，初始化Sortable
}

// 定义initSort方法
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
}
```