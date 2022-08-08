// 导入数据库模块
const mysql = require("mysql");

// 建立于 MySql 数据库的连接
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: "admin123", // 登录数据库的密码
  database: "my_db_01", // 指定要操作的数据库
});

// 检测 mysql 模块能否正常运行
/* db.query("select 1", (err, results) => {
  if (err) return console.log(err.message);
  console.log(results);
}); */

// 查询数据库里的所有数据
/* const sqlStr = "select * from users";
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message);
  // 查询数据成功
  // 注意：如果执行的是 select 查询语句，则执行结果返回的是数组
  console.log(results);
}); */

// 在数据库里插入数据
/* const user = { username: "Spider-Man", password: "pcc321" };
// 执行 sql 语句 ，其中的英文 ? 表示占位符
const sqlStr = "insert into users (username, password) values (?, ?)";

db.query(sqlStr, [user.username, user.password], (err, results) => {
  if (err) return console.log(err.message); // 插入失败
  // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
  // 可以通过 affectedRows 属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log("插入数据成功"); // 插入成功
  }
}); */

// 插入数据的便捷方式
/* const user = { username: "Spider-Man2", password: "pcc123" };
// 执行 sql 语句 ，其中的英文 ? 表示占位符
const sqlStr = "insert into users set ?";

db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message); // 插入失败
  // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
  // 可以通过 affectedRows 属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log("插入数据成功"); // 插入成功
  }
}); */

// 更新数据对象
/* const user = { id: 7, username: "Iron-Man", password: "10086" };

const sqlStr = "update users set username=?, password=? where id=?";
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("更新数据成功");
  }
}); */

// 更新数据的便捷方式
/* const user = { id: 7, username: "Iron-Man", password: "10086" };
// 定义 SQL 语句
const sqlStr = "update users set ? where id=?";
// 执行 SQL 语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("更新数据成功");
  }
}); */

// 删除数据
/* const sqlStr = "delete from users where id=?";
// 注意：如果 SQL 语句有多个占位符，则必须用数组为每个占位符指定具体的值
//      如果 SQL语句中只有一个占位符，则可以省略数组
db.query(sqlStr, 6, (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("删除数据成功");
  }
}); */

// 标记删除：使用 update 语句 代替 delete 语句；值更新数据的状态，并没有删除数据
const sqlStr = "update users set status=1 where id=?";
// 注意：如果 SQL 语句有多个占位符，则必须用数组为每个占位符指定具体的值
//      如果 SQL语句中只有一个占位符，则可以省略数组
db.query(sqlStr, 7, (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("标记删除数据成功");
  }
});
