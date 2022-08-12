// 导入 mysql 模块
const mysql = require('mysql');

// 创建数据库链接
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库 IP 地址
    user: 'root', // 登录数据库的用户名
    password: 'admin123',  // 登录数据库的密码
    database: 'my_db_01',  // 要使用的数据库
});


// 向外共享数据库
module.exports = db;