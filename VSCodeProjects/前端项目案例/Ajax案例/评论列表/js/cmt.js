$(function () {
    // 1. 获取服务器里面的评论
    function getCommentList() {
        $.ajax({
            type: "GET",
            url: "http:/www.liulongbin.top:3006/api/cmtlist",
            success: function (res) {
                if (res.status !== 200) return alert('获取评论列表失败！');
                console.log(res);
                var rows = [];
                $.each(res.data, function (i, item) {
                    var str = '<li class="list-group-item"><span span class="badge" style = "background-color: #f0ad4e;" > 评论时间：' +  item.time + '</span ><span class="badge" style="background-color: #58c0de;">评论人：'+ item.username +'</span>' + item
                    .content + '</li >'
                    rows.push(str);
                });
                $('#cmt-list').empty().append(rows.join(''));
            }
        });
    }
    getCommentList();

    // 2. 发表评论到服务器里
    $('#formAddCmt').submit(function (e) { 
        e.preventDefault();
        var data = $(this).serialize();
        // console.log(data);
        $.ajax({
            type: "POST",
            url: "http:/www.liulongbin.top:3006/api/addcmt",
            data: data,   // 将 serialize() 获取的全部数据上传到服务器中
            success: function (res) {
                if (res.status !== 201) {
                    return alert('发表评论失败');
                }
                // 发表成功后，调用获取评论函数，重新获取评论
                getCommentList();
                // 每次获取完评论后，清空表单里面的数据，要调用原生 js 里面的 reset() 函数，要把jQuery对象转换为 原生 js 对象
                // $('#formAddCmt')[0].reset(); // 方法一

                $('#formAddCmt').get(0).reset(); // 方法二
            }
        });
    });

});