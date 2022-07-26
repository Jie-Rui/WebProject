$(function() {
    // 当我们点击了 li 此时不需要执行，页面滚动事件里面的 li 选择添加 current 类
    // 使用节流阀
    var flag = true;
    // 1. 显示隐藏导航电梯
    var toolTop = $('.recommend').offset().top;
    toggleTool();
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        }else {
            $('.fixedtool').fadeOut();
        }
    };
    $(window).scroll(function () { 
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯栏对应的小 li 添加或删除 current 类
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // 遍历找到相对应的索引号 i ，再根据索引号找到对应的 li
                    // console.log(i);

                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            });
            
        }
    });
    // 2.点击电梯导航可以滚动到相对应的内容区域
    $('.fixedtool li').click(function() {
        flag = false;
        var $index = $(this).index();
        var $current = $('.floor .w').eq($index).offset().top;
        $('body, html').stop().animate({
            scrollTop: $current
        }, function() {
            flag = true;
        });
        $(this).addClass('current').siblings().removeClass();
    });
});