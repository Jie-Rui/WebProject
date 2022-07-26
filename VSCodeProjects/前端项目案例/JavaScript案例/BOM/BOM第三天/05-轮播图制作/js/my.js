window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var ol = document.querySelector('.circle');
    var ul = document.querySelector('.focus ul');
    var focusWidth = focus.offsetWidth;
    
    // 鼠标进入显示箭头
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    });
    // 鼠标离开箭头隐藏
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    });
    
    // 在 ol 中添加与 ul 中同等的 li
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        // 排他思想，给当前的 li 添加背景颜色，并且给小圆点绑定点击事件，点击到的小圆点对应相应的图片
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            // 把索引号赋值给下面的 num 和 circle 
            num = circle = index;
            // ul 中的图片循环做动画效果
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 克隆一张图片 (li) 放到 ul 的最后面，不会增加一个小圆点
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0; // 图片的第几张
    var circle = 0; // 当前白色的圆点是第几个位置
    // 右侧按钮
    var flag = true; // flag 节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;  // 关闭节流阀
            // 如果图片走到了最后一张是，快速回到第一张 left 为 0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth, function() {
            flag = true; // 打开节流阀
        });
        circle++;

        // if (circle == ol.children.length) {
        //     circle = 0;
        // }

        circle = circle == ol.children.length ? 0 : circle;
        circleChange();
        }
        
    });

    // 左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;  // 关闭节流阀
            // 如果图片走到了最后一张是，快速回到第一张 left 为 0
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth, function() {
            flag = true; // 打开节流阀
        });
        circle--;
        
        // if (circle < 0) {
        //     circle = ol.children.length - 1;
        // }

        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();
        }
        
    });
    // 封装一个圆点变换函数
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 自动播放
    function autoPlay() {
        arrow_r.click();
    }
    var timer = setInterval(autoPlay, 3000);
    focus.addEventListener('mouseover', function() {
        clearInterval(timer);
    });
    focus.addEventListener('mouseout', function() {
        timer = setInterval(autoPlay, 3000);
    });
});