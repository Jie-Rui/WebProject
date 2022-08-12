// 导入 express
const express = require('express');

// 创建服务器
const app = express();

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({extended: false}));

// 配置模板引擎
app.engine('html', require('express-art-template'));

// 公开node_modules 和 public
app.use(express.static('node_modules'));

// 导入路由模块并注册为全局中间件
app.use(require('./router/user'));

// 错误信息中间件
app.use((err, req, res, next)=> {
    res.render('error.html', {err});
});

// 启动服务器
app.listen(8888, () => {
    console.log('app server is running at http://127.0.0.1:8888/list');
});