// 1. 使用 ES6 导入语法， 导入jQuery
import $ from 'jQuery'


// 2. 定义 jQuery 的入口函数
$(function() {
    // 3. 实现奇偶行变色效果，奇数行为红色，偶数行为粉色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'pink')
})