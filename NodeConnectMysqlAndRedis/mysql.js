const mysql = require('mysql'); // 安装并引入mysql包

// 创建数据库连接池
const connection = mysql.createConnection({
  host: '', // 服务器IP，如果是本地则为localhost
  user: '', // mysql用户名
  password: '', // mysql密码
  database: '' // 数据库名称
});

// 使用
let sql = `SELECT * FROM test`; // 查询test表当中的全部数据
connection.query(sql, (error, result) => {
  if (error) throw error;
  console.log(result);
});