import { useEffect, useRef } from "react";
import { Table, Row, Button, Space } from "antd";
import Sortable from "sortablejs";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    name: "1 John Brown",
    age: 11,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "2 Jim Green",
    age: 22,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "3 Joe Black",
    age: 33,
    address: "Sidney No. 1 Lake Park",
  },
];

const TableDrag = () => {

  // Ref
  const sortableRef = useRef(null);
  const dataSourceRef = useRef(data); // 注意：dataSource必须使用ref，不能使用state，state会导致更新不同步，拖拽异常

  // 初始化
  useEffect(() => {
    initSort();
  }, []);

  // 初始化拖拽
  const initSort = () => {
    const tbody = document.querySelector(".ant-table .ant-table-tbody");
    sortableRef.current = Sortable.create(tbody, {
      disabled: false, // true为不允许拖拽，false为允许拖拽
      onEnd({newIndex, oldIndex}){
        const currRow = dataSourceRef.current.splice(oldIndex, 1)[0];
        dataSourceRef.current.splice(newIndex, 0, currRow);
      }
    });
  };
  // 开启拖拽
  const startDrag = () => {
    // let state = sortableRef.current?.option("disabled"); // 获取是否禁止拖拽，true为禁止，false为启用
    // 配置项手册：http://www.sortablejs.com/options.html
    sortableRef.current?.option("disabled", false);
  };
  // 关闭拖拽
  const endDrag = () => {
    sortableRef.current?.option("disabled", true);
  };
  // 打印数据
  const printData = () => {
    console.log(dataSourceRef.current);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Space>
          <Button type="primary" onClick={startDrag}>开启拖拽</Button>
          <Button type="primary" onClick={endDrag}>关闭拖拽</Button>
          <Button type="primary" onClick={printData}>打印数据</Button>
        </Space>
      </Row>
    </div>
  );
};

export default TableDrag;