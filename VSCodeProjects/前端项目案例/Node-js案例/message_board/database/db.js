let mysql = require("mysql");

// 创建连接池，效率更高，不需要每次操作数据库都创建连接
let pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "admin123",
	database: "my_db_01",
	port: 3306,
	connectionLimit: 50, //允许连接数
	multipleStatements: true, //是否允许执行多条sql语句
	timezone: "08:00", //大坑，必须加这一句，否则时间不对劲
});

//封装数据库sql请求操作，返回的是一个包含对象的数组
let Query = (sql, ...params) => {
	return new Promise(function (resolve, reject) {
		//从连接池中拿一条链接
		pool.getConnection(function (err, connection) {
			if (err) {
				return reject(err);
			}
			connection.query(sql, params, function (error, res) {
				// console.log(res);
				connection.release();
				if (error) {
					return reject(error);
				}
				resolve(res);
			});
		});
	});
};

module.exports = {
	Query,
};
