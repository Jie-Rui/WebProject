$(function() {
    // 1. 全选，全不选
    $('.checkall').change(function() {
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
        // 全选选中的添加背景颜色
        if($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item');
        }else {
            $('.cart-item').removeClass('check-cart-item');
        }
        getSum();
    });
    // 2. 单选，全选
    $('.j-checkbox').change(function() {
        if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        }else {
            $('.checkall').prop('checked', false);
        }
        // 单选选中添加背景颜色
        if($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        }else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
        getSum();
    });
    // 3. 增加数量
    $('.increment').click(function() {
        var $n = $(this).siblings('.itxt').val();
        $n++;
        $(this).siblings('.itxt').val($n);
        var $p = $(this).parents('.p-num').siblings('.p-price').html();
        $p = $p.substr(1);
        var $price = ($p * $n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + $price);
        getSum();
    });
    // 4. 减少数量
    $('.decrement').click(function() {
        var $n = $(this).siblings('.itxt').val();
        $n--;
        if ($n <= 0) {
            $n = 1;
            $(this).siblings('.itxt').val($n);
        }else {
            $(this).siblings('.itxt').val($n);
        }
        var $p = $(this).parents('.p-num').siblings('.p-price').html();
        $p = $p.substr(1);
        var $price = ($p * $n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + $price);
        getSum();
    });
    // 手动修改数量
    $('.itxt').change(function() {
        var $n = $(this).val();
        var $p = $(this).parents('.p-num').siblings('.p-price').html();
        $p = $p.substr(1);
        var $price = ($p * $n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + $price);
        getSum();
    });

    // 5. 封装一个计算总计和总额函数，再调用计算
    function getSum() {
        var money = 0;
        var count = 0;

            // 购物车里所有的商品计算总和
            /* 
            $('.itxt').each(function(i, ele) {
                count += parseInt($(ele).val());
            });
            $('.amount-sum em').text(count)
            $('.p-sum').each(function(i, ele) {
                money += parseFloat($(ele).text().substr(1));
            });
            $('.price-sum em').html( '￥' + money.toFixed(2)); 
            */

            // 购物车里选中的商品计算总和
            $('.j-checkbox:checked').each(function(i, ele) {
                // count += parseInt($(ele).parents('.p-checkbox').siblings('.p-num').children().children('.itxt').val());
                count += parseInt($(ele).parents('.p-checkbox').siblings('.p-num').find('.itxt').val());
                money += parseFloat($(ele).parents('.p-checkbox').siblings('.p-sum').text().substr(1));
            });
            $('.amount-sum em').text(count);
            $('.price-sum em').html( '￥' + money.toFixed(2));
    }
    getSum();

    // 6. 删除商品
    $('.p-action a').click(function() {
        if (confirm('确定要删除这件商品吗？')) {
            $(this).parents('.cart-item').remove();
        }
        getSum();
    });
    $('.remove-batch').click(function() {
        if (confirm('确定要删除选中的商品吗？')) {
            $('.j-checkbox:checked').parents('.cart-item').remove();
        }
        getSum();
    });
    $('.clear-all').click(function() {
        if (confirm('确定要清空购物车吗？')) {
            $('.cart-item').remove();
        }
        getSum();
    });

});