// 导入 数据库 模块
const db = require('../db/index');

// 获取用户信息
exports.getUsers = function(callback) {
    const sqlStr = `select * from users`;
    db.query(sqlStr, (err, results) => {
        var users = [];
        var genders = ['男', '女'];
        var states = ['正常', '删除'];
        results.forEach((user) => {
            user.gender = genders[user.gender];
            user.state = states[user.state];
            users.push(user);
        });
        callback(users);
    });
};

// 注册新用户的处理函数
exports.regUser = function(user, callback) {
    const sqlStr = `insert into users set ?`;
    db.query(sqlStr, user, (err, results) => {
        callback(results);
    });
};

// 删除用户信息处理函数，就是把用户的状态更新为 1 删除状态
exports.deleteUser = function(user, callback) {
    const sqlStr = `update users set state=1 where uid=?`;
    db.query(sqlStr, user, (err, results) => {
        callback(null);
    });
};

// 修改用户信息处理函数
exports.updateUser = function(user, callback) {
    const sqlStr = `update users set ? where uid=?`;
    db.query(sqlStr, [user, user.uid], (err, results) => {
            callback(null);
    });
};

