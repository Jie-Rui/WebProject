$(function() {
    // 定义格式化时间的过滤器
    template.defaults.imports.dataFormat = function(dtStr) {
        var dt = new Date(dtStr);
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours();
        h = h < 10 ? '0' + h : h;
        var m = dt.getMinutes();
        m = m < 10 ? '0' + m : m;
        var s = dt.getSeconds();
        s = s < 10 ? '0' + s : s;

        return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
    };

    // 获取新闻列表的函数
    function getNewsList() {
        $.ajax({
            type: "GET",
            url: "http:/www.liulongbin.top:3006/api/news",
            success: function (res) {
                if (res.status !== 200) {
                    return alert('获取新闻列表失败！');
                }
                console.log(res.data);
                var htmlStr = template('tpl-news', res);
                $('#news-list').html(htmlStr);
            }
        });
    };
    getNewsList();
});