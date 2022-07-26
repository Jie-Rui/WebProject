// 封装动画函数
// 做动画的对象元素必须要有定位
// 给不同的元素指定不同的定时器
function animate(el, target, callback) {
    // 让元素只有一个定时器在执行
    clearInterval(el.timer);
    el.timer = setInterval(function() {
        // 缓动动画步长值
        // 把步长值改为整数，不要出现小数问题
        var step = (target - el.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (el.offsetLeft == target) {
            clearInterval(el.timer);
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        el.style.left = el.offsetLeft + step + 'px';
    }, 30);
}