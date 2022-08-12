// 导入 express 
const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入数据库 模块
const db = require('../db/index');

// 导入路由操作模块 
const user_handler = require('../router_handler/user');

// 获取用户信息
router.get('/list', (req, res) => {
    user_handler.getUsers((users) => {
        res.render('list.html', {
            users:users
        });
    });
});


// 注册用户信息
router.get('/register', (req,res) => {
    res.render('register.html');
});

router.post('/register', (req, res) => {
    user_handler.regUser(req.body, () =>{
        res.redirect('/list');
    });
});

// 删除用户信息
router.get('/delete', (req, res) => {
    user_handler.deleteUser(req.query.uid, () => {
        res.redirect('/list');
    });
});


// 修改用户信息
router.get('/edit', (req,res) => {
    const sqlStr = `select * from users where uid=?`;
    db.query(sqlStr, req.query.uid, (err, results) => {
        var users = [];
        var genders = ['男', '女'];
        var states = ['正常', '删除'];
        results.forEach((user) => {
            user.gender = genders[user.gender];
            user.state = states[user.state];
            users.push(user);
        });
        res.render('edit.html', {
            users:users
        });
    });
});

router.post('/edit', (req, res) => {
    console.log(req.body);
    user_handler.updateUser(req.body, () => {
        res.redirect('/list');
    });
});

// 向外共享路由
module.exports = router;