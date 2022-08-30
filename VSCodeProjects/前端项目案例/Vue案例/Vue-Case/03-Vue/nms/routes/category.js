const express = require("express");
const db = require("../database/category");

const route = express.Router();

// 添加和修改用户数据
route.post("/save", async (req, res) => {
    // 接收客户端提交的数据
    const category = req.body;

    // 根据类型名称查询数据库表中是否已经存在该类型
    //     db.getCategories(category.cname)
    //       .then((categories)=>{
    //         if (categories.length > 0) {
    //             return res.json({
    //                 status:1,
    //                 message:'类型名称已经存在'
    //             });
    //         } else {
    //             if (category.cid) {
    //                 // 修改
    //                 return db.update(category);
    //             } else {
    //                 // 新增
    //                 return db.insert(category);
    //             }
    //         }
    //       })
    //       .then((rows)=> {
    //         if (rows > 0) {
    //             //成功
    //             return res.json({
    //                 status:0,
    //                 message:'成功更新数据'
    //             });
    //         } else {
    //             // 失败
    //             return res.json({
    //                 status:1,
    //                 message:'在更新数据的过程中发生了错误，请检查数据后重新试一试'
    //             })
    //         }
    //       })
    //       .catch((info)=>{
    //         return res.json({
    //             status:1,
    //             message:info
    //         });
    //       })
    var cs = await db.getCategories(category.cname);
    if (cs.length > 0) {
        return res.json({
            status: 1,
            message: "类型名称已经存在",
        });
    } else {
        var rows;
        if (category.cid) {
            rows = await db.update(category);
        } else {
            rows = await db.insert(category);

            if (rows > 0 && req.session.total) {
                req.session.total++
            }
        }
        if (rows > 0) {
            //成功
            return res.json({
                status: 0,
                message: "成功更新数据",
            });
        } else {
            // 失败
            return res.json({
                status: 1,
                message: "在更新数据的过程中发生了错误，请检查数据后重新试一试",
            });
        }
    }
});


// 根据cid 查询一条类型数据
route.get('/getSingle', async (req, res) => {
    const category = parseInt(req.query.cid)
    var cs = await db.getSingle(category);
    if (cs.length > 0) {
        return res.json({
            status: 0,
            message: "查询成功",
            data: cs[0]
        })
    } else {
        return res.json({
            status: 1,
            message: "未找到有效的cid"
        })
    }
});

//功能：分页显示类型数据
route.get('/page',async (req,res)=>{
	const page = req.query
	var curr = page.curr ? parseInt(page.curr) : 1
	var limit = page.limit ? parseInt(page.limit) : 5
	var cs = await db.getPage(curr,limit)
    if (!req.session.total) {
        req.session.total = await db.getTotal()
    }
    var total = req.session.total
	if(cs.length > 0){
		return res.send({
            status: 0,
            message: "查找成功",
            data: cs,
            total
        })
	} else {
		return res.json({
			status: 1,
			message: "查找失败",
		})
	}
})


// 根据 cid 删除一条类型数据
route.get('/remove', async (req, res) => {
    var cid = parseInt(req.query.cid)
    var cs = await db.remove(cid)
    if (cs > 0) {
        res.json({
            status: 0,
            message: "删除数据成功"
        })
    }else {
        res.json({
            status: 1,
            message: "删除数据失败"
        })
    }
    
});
module.exports = route;
