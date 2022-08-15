const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
const common = require("../utils/common.js");

// 首页
router.get("/", (req, res) => {
	// 按id倒序排列
	let sql = "SELECT * FROM `message_board` ORDER BY id DESC";
	db.Query(sql).then((data) => {
		res.render("index.html", {
			title: "首页",
			data: data,
		});
	});
});

// 添加数据
router.post("/add", common.urlencodedParser, (req, res) => {
	let sql = `INSERT INTO message_board (name,content) VALUES ('${req.body.name}','${req.body.content}')`;
	db.Query(sql).then((data) => {
		// console.log(data);
		res.send({
			code: 200,
			msg: "操作成功",
		});
		res.end();
	});
});

// 编辑页面
router.get('/edit',(req,res)=>{
	let sql = `select * from message_board where id=${req.query.id}`
	db.Query(sql).then((data)=>{
		// console.log(data);
		res.render('edit.html',{data:data})
	})
})

// 提交编辑
router.post('/edit',common.urlencodedParser,(req,res)=>{
	// console.log(req.body.id)
	// console.log(req.body)
	let sql = `update message_board set name='${req.body.name}',content='${req.body.content}' where id=${req.body.id}`
	db.Query(sql).then((data)=>{
		res.send({
			code:200,
			msg:'操作成功',
		})
		// console.log('data',data)
	})
})

// 删除
router.post('/delete',common.urlencodedParser,(req,res)=>{
	let sql = `update message_board set state=1 where id=${req.body.id}`
	db.Query(sql).then((data)=>{
		res.send({
			code:200,
			msg:'操作成功',
		})
	})
})

module.exports = router;
