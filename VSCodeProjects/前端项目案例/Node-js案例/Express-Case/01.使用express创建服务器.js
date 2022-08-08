// 导入 express 模块
const express = require('express');

// 创建 web 服务器
const app = express();

app.get('/user', (req, res) => {
    console.log(req.query);
    res.send(req.query)
});
// id 是一个动态参数
app.get('/user/:id', (req, res) => {
    console.log(req.params);
    res.send(req.params);
});
// 启动 web 服务器
app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
});