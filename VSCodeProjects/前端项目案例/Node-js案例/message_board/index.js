// 创建服务
const express = require("express");
var app = express();

// 设置静态文件目录
app.use("/node_modules/", express.static("./node_modules/"));
app.use("/public/", express.static("./public/"));

// 跨域，配置中间件
const cors = require('cors');
app.use(cors());


// 模板引擎
app.engine("html", require("express-art-template"));

// 路由
const router = require("./router/index.js");
app.use(router);



// 错误处理
app.use(function (err, req, res, next) {
	res.render("err.html", { err });
});

// 服务端口
app.listen(8888, () => {
	console.log("server running on http://127.0.0.1:8888");
});
