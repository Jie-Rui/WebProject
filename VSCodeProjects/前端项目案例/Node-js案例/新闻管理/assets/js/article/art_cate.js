$(function () {
  var layer = layui.layer;
  var form = layui.form;

  initArtCateList();

  // 获取新闻分类的列表
  function initArtCateList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        var htmlStr = template("tpl-table", res);
        var count = res.data.length;
        $("tbody").html(htmlStr);
        // 分页模块
        layui.use("laypage", function () {
          var laypage = layui.laypage;

          //执行一个laypage实例
          laypage.render({
            elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
            count: count, //数据总数，从服务端得到
            limit: 5,
            limits: [5, 10, 15, 20, 25],
            layout: ["count", "limit", "prev", "page", "next", "skip"],
            jump: function (obj, first) {
              //obj包含了当前分页的所有参数，比如：
              // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
              // console.log(obj.limit); //得到每页显示的条数
              obj.curr = res.data;
              obj.limit = res.data.length;

              //首次不执行
              if (!first) {
                initArtCateList();
              }
            },
          });
        });
      },
    });
  }

  // 为添加类别按钮绑定点击事件
  var indexAdd = null;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加新闻分类",
      content: $("#dialog-add").html(),
    });
  });

  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新增分类失败！");
        }
        initArtCateList();
        layer.msg("新增分类成功！");
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd);
      },
    });
  });

  // 通过代理的形式，为 btn-edit 按钮绑定点击事件
  var indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出一个修改新闻分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改新闻分类",
      content: $("#dialog-edit").html(),
    });

    var id = $(this).attr("data-id");
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });

  // 通过代理的形式，为修改分类的表单绑定 submit 事件
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新分类数据失败！");
        }
        layer.msg("更新分类数据成功！");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });

  // 通过代理的形式，为删除按钮绑定点击事件
  $("tbody").on("click", ".btn-delete", function () {
    var id = $(this).attr("data-id");
    // 提示用户是否要删除
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除分类失败！");
          }
          layer.msg("删除分类成功！");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
